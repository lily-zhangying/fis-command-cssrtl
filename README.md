fis-command-cssrtl
==================

fis-command-cssrtl

fis css rtl 转换工具

功能：实现css rtl的自动转换。

使用：

    安装：npm install fis-command-cssrtl -g
    使用：
    1. 转换单个文件
        fisp cssrtl a.css
    2. 指定目录转换（非递归转换）
        fisp cssrtl -d ./
    3. 指定目录转换，递归转换（所有子文件夹下css全部转换）
        fisp cssrtl -d ./ -R
    4. 转换结果
        在原文件 *.css旁边生成 *.rtl.css

转换范围：

1. margin

margin-left:100px; => margin-right:100px;

margin-right:100px; => margin-left:100px;

margin: 1px 2px 3px 4px => margin: 1px 4px 3px 2px

2. padding同margin

3. text-align

text-align:left => text-align:right

text-align:right => text-align:left

4. float
float: left; => float: right;

float: right; => float: left;

4. border

p{border-right:1px;} => p{border-left:1px;}

p{border-color:#000 #111 #222 #333;} => p{border-color:#000 #333 #222 #111;}

p{border-width:0 1px 2px 3px;} => p{border-width:0 3px 2px 1px;}

5. border-radious

border-radius:0 1px 2px 3px; => border-radius:0 3px 2px 1px;

6. background-position

    p{background-position:20px;} => p{background-position:right 20px;}

7. clear

    clear:right; => clear:left;
    clear:left; => clear:right;

8. position

    p{left:50%;} => p{right:50%;}

9. direction
    p{direction:ltr;} => p{direction:rtl;}

10. noflip

    /* @noflip */ p {margin-left: 5px;} => p{margin-left:5px;}


测试：
1. 测试单文件转换
2. 测试目录转换
3. 测试递归目录转换
5. 测试源文件内容改变后，再次转换，*.rtl.css文件内容改变