function domscript() {
	var args = arguments;
	var self = {};

	self.compile = (element) => {return element.export()};

	return self;
}
domscript.PlainText = function(text) {
	console.warn("Plaintext is a deprecated API and should not be used!");
	var out = {
		plainText: true,
		content: text,
		export: function(pretty) {
			return `${text}`;
		}
	}
	out.export.exists = true;
	return out;
};
domscript.Element = function(tag,attr,content) {
	return {
		tag: tag,
		attr: attr,
		content: content,
		checkAttr: function(key) {
			for(var i in this.attr) {
				if(this.attr[i][0] == key) return true;
			}
			return false;
		},
		setAttr: function(key,value) {
			if(!this.checkAttr(key)) { this.attr.push([key,value]); return; }
			
			for(var i in this.attr) {
				if(this.attr[i][0] == key) { this.attr[i][1] = value; return;}
			}
		},
		getAttr: function(key) {
			if(!this.checkAttr(key)) { return; }
			for(var i=0; this.attr[i][0] != key; i++);
			return this.attr[i][1];
		},
		export: function() {
			var pretty = false;

			// inside content (via recursive function :))
			var cntnt = "";
			if(pretty) cntnt += "\n";
			for(var i in this.content) {
				if(pretty) cntnt += "	";
				try {
					cntnt += this.content[i].export(pretty);
				} catch(er) {
					cntnt += this.content[i];
				}

				if(pretty) cntnt += "";
			}
			// attributes
			var attr = "";
			for(var i in this.attr) {
				attr += " ";
				attr += this.attr[i][0];
				attr += "=";
				attr += this.attr[i][1];
				//attr += " ";
			}
			//put it together
			return "<"+tag+attr+">"+cntnt+`</`+tag+">";
		}
	}
}
domscript.Style = function(attr, rules) {
	var out = this.Element('style',attr,[]);
	out.selectors = rules;
	out.export = function() {
		var out = "";
		for(var i in this.selectors) {
			out += this.selectors[i].export();
		}
		return "<style>"+out+"</style>";
	}
	return out;
}
domscript.Style.Ruleset = function(selectors, properties) {
	return {
		selectors: selectors, 
		properties: properties,
		export: function() {
			var out = this.selectors.join(", ") + "{";

			for(var i in this.properties) {
				out += this.properties[i].export();
			}
			
			out += "}";
			return out;
		}
	};
}
domscript.Style.Rule = function(key,value) {
	return {
		key: key,
		value: value,
		export: function() {
			try {
				return this.key.export()+": "+this.value.export()+";";
			} catch(er) {
				return this.key+": "+this.value+";";
			}
		}
	};
}
domscript.Style.Plaintext = function(text) {
	console.warn("Plaintext is a deprecated API and should not be used!");
	var out =  {
		text: text,
		export: function() {return this.text}
	}
	out.export.exists = true;
	return out;
}
domscript.Style.RGB = function(r,g,b) {
	var out = {
		r: r,
		g: g,
		b: b,
		export: function() {
			return `rgb(${r},${g},${b})`;
		}
	};
	out.export.exists = true;
	return out;
}
domscript.Script = function(attr,content) {
	var out = DS.Element('script',attr,content.toString());
	return out;
}
var DS = domscript;
