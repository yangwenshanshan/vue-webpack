export function setCookie(c_name,value,expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+";path=/ "+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

export function getCookie(c_name){
	if (document.cookie.length>0){
		let c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1;
			let c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1){
				c_end=document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return ""
}

export function getParamFrom() {
	var uk1 = getCookie("uk1");
	var uk1Array = uk1.split("_");
	for(var i=0; i<uk1Array.length; i++) {
		if(uk1Array[i] && uk1Array[i].startsWith("f:")) {
			return uk1Array[i].substring("f:".length, uk1Array[i].length);
		}
	}
}
