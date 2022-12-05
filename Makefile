install:
	npm ci

build:
	npx rimraf build
	npx tsc
	npx copyfiles --up 1 --all ./day/**/*.txt build/day

run:
	node build/day/$(day)

create:
	mkdir day/${day}
	touch day/${day}/index.ts day/${day}/input.txt day/${day}/README.md

.PHONY: build run create