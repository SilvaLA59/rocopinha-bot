// /**
//  * Description of the action goes here
//  * @param  {String} params.name=value Description of the parameter goes here
//  * @param  {Number} [params.age] Optional parameter
//  */
  
  module.exports = { 
    startFlow: async (state)=>{
      return {
        ...state,
        count: 0
      }
    },
    getUserMessage: async (state, event)=>{
      const clone = { ...state }
      delete clone.text
      //Se for choise vem raw.data.payload
      //Se for texto vem raw.text
      var resp = event.text.toLowerCase()
      if(event.raw.data && event.raw.data.payload){
        resp = event.raw.data.payload.toLowerCase()
      }
      clone.text = resp
      return clone
      //return { ...state, text: resp }
    },
    setUserTag: async (state, event, { name, value }) => {
      //await event.bp.users.tag(event.user.id, name, value)

      var clone = { ...state }
      delete clone.text
      if(!clone.userInfo){
        clone.userInfo = { userId: event.user.id }
      }
      
      var resp = event.text.toLowerCase()
      if(event.raw.data && event.raw.data.payload){
        resp = event.raw.data.payload.toLowerCase()
      }
      clone.userInfo[name] = resp
      clone.text = resp
      return clone
    },
    sendData: async (state, event, { name, value}) =>{      
      var request = require("request");
      var ulrService = process.env.pathAPI || 'http://127.0.0.1:8001';      
      var options = { method: 'POST',
        url: ulrService + '/bot/enviar-dados',
        headers:
        {
          'Content-Type': 'application/json'
        },
        body:
        { 
          botAgent: process.env.bot || "consultor-saude",
          dataType: name,
          data: value
        },
        json: true
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
      });
    },
    getMenu: async (state, event) =>{
      var request = require("request");
      var ulrService = process.env.pathAPI || 'http://127.0.0.1:8001';      
      var options = { method: 'POST',
        url: ulrService + '/rocopinha/getmenu',
        headers:
        {
          'Content-Type': 'application/json'
        },
        body:
        { 
          botAgent: 'consultor-saude' 
        },
        json: true
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);

        event.reply("#choice", { text: "Posso te ajudar em algum dos itens abaixo?", choices: body, typing: true })
        
      });
    }
  }