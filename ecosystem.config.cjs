module.exports = {
  apps: [
    {
      script: 'app.js',
      name: 'movie-service-auto-deploy',
    },
  ],

  deploy: {
    production: {
      user: 'movie-service',
      host: '51.250.8.134',
      ref: 'origin/level-1',
      repo: 'git@github.com:Dmitry-Rusinov/movies-explorer-api.git',
      path: '/home/movie-service/auto-deploy',
      'pre-deploy-local': 'scp .env movie-service@51.250.8.134:/home/movie-service/auto-deploy/current/backend',
      'post-deploy': 'pwd && backend && npm i && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
