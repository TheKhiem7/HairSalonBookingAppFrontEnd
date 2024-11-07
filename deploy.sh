echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@14.225.192.118:/var/www/html/
echo "Done!"