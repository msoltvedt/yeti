function t(t,e,n){return(t||"")+(e?` ${e}`:"")+(n?` ${n}`:"")}const e={generateUniqueId:function(){return++n,"yid"+n},isConvertibleToDate:function(t){return t.search(/(\b[0-9]{1,4}(\/|\-)[0-9]{1,2}(\/|\-)[0-9]{2,4}\b)|((\w{3})\s\d)/g)>-1&&"Invalid Date"!=new Date(t).toString()},isConvertibleToNumber:function(t){let e=this.castToNumber(t.toString());return!Number.isNaN(e)},getStringifiedType:function(t){return e.isConvertibleToDate(t)?"date":e.isConvertibleToNumber(t)?"number":"string"},castToNumber:function(t){return parseFloat(t.replace(/,/g,""))},isValidJSON:function(t){t=JSON.stringify(t);try{JSON.parse(t)}catch(t){return!1}return!0}};let n=0;export{t as f,e as u}