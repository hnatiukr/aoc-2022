install:
	npm ci

build:
	npx rimraf build
	npx tsc
	npx copyfiles --up 1 --all ./day/**/*.txt build/day

run:
	node build/day/$(day)

.PHONY: build run