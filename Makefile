build:
	bundle install

serve:
	bundle exec jekyll serve --host 0.0.0.0 --watch

all: build
