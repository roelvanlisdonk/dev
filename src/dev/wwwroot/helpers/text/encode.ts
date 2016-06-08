module zvdz.helpers.text {
    export function encode(tekst) {

        if (!tekst) {
            return '';
        }

        var encoded = tekst.toString();
        var findReplace = [
            [/&/g, "&amp;"],
            [/</g, "&lt;"],
            [/>/g, "&gt;"],
            [/"/g, "&quot;"],
            [/'/g, '&#39;']
        ];

        for (var item in findReplace) {
            encoded = encoded.replace(findReplace[item][0], findReplace[item][1]);
        }

        return encoded;
    }
}