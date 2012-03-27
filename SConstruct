srcDir = "./src/"
buildDir = "./compiled/"

cocoDir = srcDir + 'coco/'
jsDir = buildDir + 'javascript/'

coco = "/home/anders/bin/coco --bare"
#coco = "/home/anders/bin/coco"
lessc = "/home/anders/bin/lessc"

build = {
	'html': True,
	'js': True,
	'json': True,
	'co': True,
	'less': False
}

lessDir = "./styles/less/"
cssDir = "./styles/css/"

######

import os, fnmatch

def find( pattern, dir ):
	files = []
	for root, dirnames, filenames in os.walk(dir):
		for filename in fnmatch.filter(filenames, pattern):
			files.append(os.path.join(root, filename))
	return files

######

env = Environment()

mkdirTarget = 'mkdir -p `dirname $TARGET`; ';

copyBuild = mkdirTarget + 'cp $SOURCE $TARGET'

def doCopyBuild( ext ):
	theseFiles = find(ext, srcDir)
	for thisFile in theseFiles:
		newFile = thisFile.replace(cocoDir, jsDir)
		newFile = newFile.replace(srcDir, buildDir)
		env.Command( newFile, thisFile, copyBuild )

if build['html']:
	doCopyBuild('*.html')

if build['js']:
	doCopyBuild('*.js')

if build['json']:
	doCopyBuild('*.json')

if build['co']:
	coBuild = mkdirTarget + coco + ' -c -o `dirname $TARGET` $SOURCE'
	coFiles = find('*.co', cocoDir)
	for coFile in coFiles:
		jsFile = coFile.replace('.co', '.js')
		jsFile = jsFile.replace(cocoDir, jsDir)
		print(jsFile)
		env.Command( jsFile, coFile, coBuild )

if build['less']:
	lessBuild = mkdirTarget + lessc + ' $SOURCE > $TARGET'
	lessFiles = find('*.less', lessDir)
	for lessFile in lessFiles:
		basename = os.path.basename(lessFile)
		if basename[0] == '_':
			continue
		cssFile = lessFile.replace('.less', '.css')
		cssFile = cssFile.replace(lessDir, cssDir)
		env.Command( cssFile, lessFile, lessBuild )
	

