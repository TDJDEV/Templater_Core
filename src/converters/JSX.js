const Template = `<div id="lmt" onclick="Test" style="color: red; font-size: 10px;"><p class="text">This is a test<label for="username">is a label</label></p></div>`

const JSX = {}
JSX.converter = (template) => {
	let paragraph = template

	paragraph = paragraph.replace(" class=", " className=")

		.replace(" for=", " htmlFor=")
		.replace(" charset=", " charSet=")
		.replace(" accept-charset=", " acceptCharset=")
		
		.replace(/onclick/g, "onClick")
		.replace(/onClick="([^"]*)"/g, 'onClick={$1}')

		.replace(/style="(.*?)"/, (match, styleString) => {
			const styleObject = {}
			styleString.split(';').forEach(style => {
				const [key, value] = style.split(':').map(s => s.trim());
				if (key && value) { styleObject[key] = value; }
			})
			const jsxStyle = JSON.stringify(styleObject).replace(/"([^"]+)":/g, '$1:');

			return `style={${jsxStyle}}`;
		});

	return paragraph
}

export default JSX

