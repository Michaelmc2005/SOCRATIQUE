<script lang="ts">
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai'
	export let type: ChatCompletionRequestMessageRoleEnum
	export let message: string
</script>

<div class="chat {type === 'user' ? 'chat-end' : 'chat-start'} justify-end">
	<div class="chat-image avatar">
		<div class="w-10 rounded-full">
			<img
				src="https://ui-avatars.com/api/?name={type === 'user' ? 'Me' : 'S'}"
				alt="{type} avatar"
			/>
		</div>
	</div>
	<div class="chat-header">
		{type === 'user' ? 'Me' : 'Socratique'}
	</div>
	<div class="chat-bubble {type === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}">
		{message}
	</div>
</div>
<style>
	/* Customize the chat bubble colors */
	.chat-bubble-primary {
	  background-color: #CECECF ;
	  color: #333;
	}
  
	.chat-bubble-primary-light {
	  background-color: #2196f3;
	  color: #fff;
	}
  
	.chat-bubble-secondary {
	  background-color: #2787DD ;
	  color: #fff;
	}
  
	.chat-bubble-secondary-light {
	  background-color: #fff;
	  color: #333;
	}
  
	/* Customize the chat header colors */
	.chat-header-primary {
	  color: #fff;
	}
  
	.chat-header-secondary {
	  color: #333;
	}
  </style>