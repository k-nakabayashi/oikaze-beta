// gulpプラグインの読み込み
const gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass");
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); 
const assets = require("postcss-assets");
//var csscss = require('gulp-csscss');

//監視対象ファイル
//ページ毎のscssを追加していく
//cssコンパイルは、c_scss/*.sccを更新した時にだけ走る
const watchingFile = ["./scss/*.scss", "./scss/*/*.scss", "./scss/*/*/*.scss",];

// style.scssをタスクを作成する
console.log("before");
gulp.task("default", function() {
  console.log("task start");

  return gulp.watch(watchingFile, function(){

    console.log("watached!");
    // style.scssファイルを取得
    return (
      gulp
        .src(watchingFile)
        // Sassのコンパイルを実行
        .pipe(
          sass({outputStyle: "expanded"})
          .on("error", sass.logError))
        .pipe(
          postcss([autoprefixer()]))
        .pipe(
          postcss([assets({loadPaths: ['images/'] })]))
        //.pipe(csscss())
        // cssフォルダー以下に保存
        .pipe(gulp.dest("css"))
    );
    //retun end;
  });
  //watch end;
});

