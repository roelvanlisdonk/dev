var input = 'html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video';
console.log(input);
var items = input.split(',');
var trimmedItems = items.map(function (item) {
    return item.trim();
});
var sortedItems = trimmedItems.sort();
console.log(sortedItems.join(', '));
//# sourceMappingURL=repl.js.map