module.exports = {
    id: 'choice',
    title: 'Single Choice',
    renderer: '#choice',
  
    jsonSchema: {
      title: 'A regular Single Choice message',
      description: 'A regular Single Choice message',
      type: 'object',
      required: [],
      properties: {
        text: {
          type: 'string',
          title: 'Message'
        },
        choices: {
            type: 'string',
            title: 'Quick Replies',
            items: {
                type: 'string',
                default: ''
            }
        },
        typing: {
          type: 'boolean',
          title: 'Show typing indicators',
          default: true
        }
      }
    },
  
    uiSchema: {
      variations: {
        'ui:options': {
          orderable: false
        }
      }
    },
  
    computePreviewText: formData => 'Text: ' + formData.text,
    computeMetadata: null
  }
  