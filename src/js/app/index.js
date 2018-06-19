require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/api/big',
        dataType: 'json',
        success: function(res) {
            //用jquery获取模板
            var tpl = $("#tpl").html();
            //预编译模板
            var template = handlebars.compile(tpl);
            //匹配json内容
            var html = template(res);
            //输入模板
            $('.big').html(html);
        },
        error: function(err) {
            console.warn(err);
        }
    })
})