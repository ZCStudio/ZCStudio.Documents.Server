
gj.tree.methods.expandToTop = function (tree, node) {
    var id = node.attr('data-id');
    var data = tree.getDataById(id);
    while (data.ParentId) {
        var parentNode = tree.getNodeById(data.ParentId);
        if (parentNode) {
            tree.expand(parentNode);
        } else {
            tree.expand(node);
        }
        data = tree.getDataById(data.ParentId);
    }
}