const { build, context } = require('esbuild')

const watch = process.argv.slice(2).includes('--watch')
const serve = process.argv.slice(2).includes('--serve')

const config = {
  entryPoints: ['src/index.tsx'],
  outdir: 'public',
  bundle: true,
  minify: process.env.MODE === 'production',
  charset: 'utf8',
  target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
  logLevel: 'info',
  loader: { '.svg': 'dataurl' },
  legalComments: 'none',
}

if (watch || serve) {
  context(config).then(async ctx => {
    if (watch) await ctx.watch()
    if (serve) await ctx.serve({ servedir: 'public' })
  })
} else {
  build(config).catch(() => process.exit(1))
}
