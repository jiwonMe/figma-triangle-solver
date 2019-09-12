figma.showUI(__html__);

figma.ui.onmessage = msg => {
  if (msg.type === "create-triangle") {
    const nodes: SceneNode[] = [];

    let a: number = 50 * Number(msg.a);
    let b: number = 50 * Number(msg.b);
    let c: number = 50 * Number(msg.c);

    let s: number = triangleArea(a, b, c);
    console.log(s);
    var h = (2 * s) / c;

    var x = Math.sqrt(b * b - h * h);

    var svg =
      `
    <svg height="` +
      (Number(h) + 10) +
      `" width="` +
      (Math.max(Number(c), Number(x)) + 10) +
      `">
        <polygon
            points="
            ${5},${Number(h) + 5} 
            ${Number(c) + 5},${Number(h) + 5} 
            ${Number(x) + 5},${5}"
            style="
                fill:#eeeeee;
                stroke:black;
                stroke-width:2
            " />
    </svg>
    `;

    //console.log(svg);
    const node = figma.createNodeFromSvg(svg);
    const group = figma.group(node.children, figma.currentPage);
    node.remove();

    group.name = "triangle";

    nodes.push(group);

    if (figma.currentPage.selection.length > 0) {
      const selection = figma.currentPage.selection[0];
      group.x = selection.x;
      group.y = selection.y;
      if (selection.type.toLowerCase() === "frame" && selection.children) {
        group.x = selection.width / 2;
        group.y = selection.height / 2;
        selection.appendChild(group);
      } else {
        selection.parent.appendChild(group);
        group.x = selection.x + selection.width + 10;
        group.y = selection.y;
      }
      nodes.push(selection);
    } else {
      nodes.push(figma.currentPage);
    }
    figma.currentPage.selection = [group];
    //figma.viewport.scrollAndZoomIntoView(nodes);
  }
};

function triangleArea(a: number, b: number, c: number): number {
  //heron's theorem
  console.log(typeof a);
  let s: number = a / 2 + b / 2 + c / 2;
  let A = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  console.log(s, A);
  return A;
}
