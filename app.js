var Korbit = require('./korbit.js');

var korbit = new Korbit('xiJD5Yk7V3fYwa3qv81UWY5cX74sgjfggjGiwIpOdWrdFSvSZUHjYRTQtuz3c', 'EhBhWIaNB8dintdDHG0iLRqCuM7AzbPk4pTiomN2i7rUj3mMGkTKDXI2ENtjF', 'info@bitwire.co', 'password');

korbit.authorize(function(err, result){
  korbit.getWalletStatus(function(err, result){
    console.log(err);
  });
});
// korbit.constants();