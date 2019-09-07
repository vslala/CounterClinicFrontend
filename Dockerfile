FROM nginx
COPY /Users/in-varun.shrivastava/Code/src/github.com/react/CounterClinicFrontend/build /usr/share/nginx/html
CMD ["sh", "-c", "nginx -g \"daemon off;\""]
