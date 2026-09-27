const { spawnSync } = require('child_process');
const command = process.argv[2] || 'start';
const result = spawnSync(process.execPath, [require.resolve('react-scripts/bin/react-scripts.js'), command, ...process.argv.slice(3)], { stdio: 'inherit', env: { ...process.env, SKIP_PREFLIGHT_CHECK: 'true', NODE_OPTIONS: [process.env.NODE_OPTIONS, '--openssl-legacy-provider'].filter(Boolean).join(' ') } });
process.exit(result.status === null ? 1 : result.status);
