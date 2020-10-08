# volunteer-network-server
echo "# volunteer-network-server" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mimnets/volunteer-network-server.git
git push -u origin main
                

I just faced the same issue and solved it using the following.First clear tracked files by using :

git clean -d -f
then try git pull origin master