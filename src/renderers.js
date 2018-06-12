module.exports = {
    text: data => {
        return { text: data.text, typing: !!data.typing }
    },
    choice: data => {
        return {
            text: data.text,
            quick_replies: data.choices.map(choice => `<${choice.payload}> ${choice.text}`),
            typing: !!data.typing
        }
    },
    carousel: data => {
        return [
            {
                on: 'webchat',
                type: 'carousel',
                typing: !!data.typing,
                text: 'Documents',
                elements: (data.documents || []).map(doc => ({
                    title: doc.name,
                    picture: doc.image,
                    subtitle: doc.preview,
                    buttons: [{ url: doc.button_url, title: doc.button_title }]
                }))
            },
            {
                on: 'facebook',
                template_type: 'generic',
                elements: (data.documents || []).map(doc => ({
                    title: doc.name,
                    image_url: doc.image,
                    subtitle: doc.preview,
                    buttons: [{ type: 'web_url', url: doc.button_url, title: doc.button_title }]
                }))
            }
        ];
    },
    //renders teste, não funcionam ainda
    form: data => {
        return [
            {
                on: 'webchat',
                text: 'Formulario',
                type: 'form',
                title: data.title,
                id: data.id,
                elements: [
                    { input:{ name: 'nome', label: 'nome', placeholder: 'text here'}},
                    { textarea:{ name: 'assunto', label: 'assunto', placeholder: 'text here'}}
                ]
            }
        ]
    },
    login_prompt: data => {
        return {
            on: 'webchat',
            type: 'login_prompt',
            text: 'Seu login',
        }
    },
    video: data =>{
        return [
            {
                on: 'facebook',
                video: data.url
            }
        ]
    }
}
