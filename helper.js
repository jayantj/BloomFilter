var CONST = require('./constants.js')

function getIP(){
	if(CONST.G_IP_ADDR == ''){
		var ifaces = require('os').networkInterfaces();
		var ipaddress = '';
		if(ifaces[CONST.G_IFACE] != null)
			return ifaces[CONST.G_IFACE][0].address;
	}else	
		return CONST.G_IP_ADDR;		
}

function getPort()
{
	return CONST.G_SERVER_PORT
}

module.exports.getIP = getIP
module.exports.getPort = getPort

