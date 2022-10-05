call npm run build
copy dist\index.html dist\404.html
call git add dist
call git commit -m "dist subtree"
call git subtree push --prefix dist origin main-pages