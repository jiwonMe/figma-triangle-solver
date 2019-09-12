figma.showUI(__html__);
figma.ui.onmessage = function (msg) {
    if (msg.type === "create-triangle") {
        var nodes = [];
        var a = 50 * Number(msg.a);
        var b = 50 * Number(msg.b);
        var c = 50 * Number(msg.c);
        var s = triangleArea(a, b, c);
        console.log(s);
        var h = (2 * s) / c;
        var x = Math.sqrt(b * b - h * h);
        var svg = "\n    <svg height=\"" +
            (Number(h) + 10) +
            "\" width=\"" +
            (Math.max(Number(c), Number(x)) + 10) +
            ("\">\n        <polygon\n            points=\"\n            " + 5 + "," + (Number(h) + 5) + " \n            " + (Number(c) + 5) + "," + (Number(h) + 5) + " \n            " + (Number(x) + 5) + "," + 5 + "\"\n            style=\"\n                fill:#eeeeee;\n                stroke:black;\n                stroke-width:2\n            \" />\n    </svg>\n    ");
        //console.log(svg);
        var node = figma.createNodeFromSvg(svg);
        var group = figma.group(node.children, figma.currentPage);
        node.remove();
        group.name = "triangle";
        nodes.push(group);
        if (figma.currentPage.selection.length > 0) {
            var selection = figma.currentPage.selection[0];
            group.x = selection.x;
            group.y = selection.y;
            if (selection.type.toLowerCase() === "frame" && selection.children) {
                group.x = selection.width / 2;
                group.y = selection.height / 2;
                selection.appendChild(group);
            }
            else {
                selection.parent.appendChild(group);
                group.x = selection.x + selection.width + 10;
                group.y = selection.y;
            }
            nodes.push(selection);
        }
        else {
            nodes.push(figma.currentPage);
        }
        figma.currentPage.selection = [group];
        //figma.viewport.scrollAndZoomIntoView(nodes);
    }
};
function triangleArea(a, b, c) {
    //heron's theorem
    console.log(typeof a);
    var s = a / 2 + b / 2 + c / 2;
    var A = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    console.log(s, A);
    return A;
}
