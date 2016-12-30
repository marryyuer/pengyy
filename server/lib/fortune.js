var fortunecookies = [
    "Conquer your fear or they will conquer you.",
    "Rivers need springs.",
    "Don not fear what you don't k.now ",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple."
];

exports.getFortune = function() {
    var idx = Math.floor(Math.random() * fortunecookies.length);
    return fortunecookies[idx];
};