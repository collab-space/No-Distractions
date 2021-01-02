cbe:
	@docker build . -t focusserver

# build:
# 	go build -o runserver cmd/main.go 

clean:
	@docker rmi $(@docker images -qa -f 'dangling=true')
	
run:
	@docker run -d --rm -p 5000:5000 focusserver 

