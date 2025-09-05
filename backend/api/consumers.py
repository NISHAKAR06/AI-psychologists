import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope['user'].is_authenticated:
            self.room_name = 'video_conference'
            self.room_group_name = f'chat_{self.room_name}'

            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()
        else:
            await self.close()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_type = data.get('type')

        if message_type == 'offer' or message_type == 'answer' or message_type == 'ice-candidate':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'webrtc_message',
                    'message': data
                }
            )
        else:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': data
                }
            )

    async def chat_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps(message))

    async def webrtc_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps(message))
