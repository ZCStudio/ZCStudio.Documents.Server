function MDFile(file) {
    var mdpath = 'api/GetFileText/' + encodeURIComponent(file.FilePath);
    $.ajax({
        url: mdpath,
        error: function (result) {
            alert(result);
        },
        success: function (result) {
            marked(result.result, function (err, content) {
                if (err)
                    throw err;
                document.getElementById('content').innerHTML = content;
            });
        }
    });
}

$(document).ready(function () {
    var rendererMD = new marked.Renderer();
    rendererMD.link = function (href, attr, text) {
        if (!attr) {
            attr = '';
        }
        var attrs = attr.split("|");
        var title = '', target = '';
        if (attrs.length >= 1) {
            title = ' title="' + attrs[0] + '" ';
        }
        if (attrs.length >= 2) {
            target = ' target="' + attrs[1] + '" ';
        }
        return '<a href="' + href + '" ' + title + target + '>' + text + '</a>';
    }
    rendererMD.image = function (href, attr, text) {
        if (!attr) {
            attr = '';
        }
        var attrs = attr.split("|");
        var title = '', width = '', height = '';
        if (attrs.length >= 1) {
            title = ' title="' + attrs[0] + '" ';
        }
        if (attrs.length >= 2) {
            width = '  width="' + attrs[1] + '"';
        }
        if (attrs.length >= 3) {
            height = ' height="' + attrs[2] + '" ';
        }

        return '<img alt="' + text + '" src="' + href + '"' + title + width + height + '>';
    }

    marked.setOptions({
        renderer: rendererMD,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });

    EventBus.addEventListener("loadmdfile", function (e, file) {
        document.getElementById('content').innerHTML = "";

        var newUrl = $.query.set("filepath", file.FilePath).toString();
        window.history.pushState(window.history.state, "", newUrl);

        var index1 = file.FilePath.lastIndexOf(".");
        var index2 = file.FilePath.length;
        var extname = file.FilePath.substring(index1, index2).toLowerCase();
        switch (extname) {
            case ".md":
                MDFile(file);
                break;
            case ".pdf":
                var url = 'api/GetFile/' + encodeURIComponent(file.FilePath);
                $('#content').append('<embed class="container-fluid" style="height:' + $(document).height() + 'px;" src="' + url + '" />');
                break;
            default:
                if (index1 != -1) {
                    document.getElementById('content').innerHTML = "不支持此文件格式" + extname;
                }
                break;
        }
    });
});