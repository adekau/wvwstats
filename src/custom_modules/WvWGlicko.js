// Constants
const tau = 0.6

function WvWGlicko (scores, deviations, volatilities, oldRatings) {
  // Scores
  if (scores.green && scores.blue && scores.red) {
    this.sG = scores.green
    this.sB = scores.blue
    this.sR = scores.red
  }

  // Deviations (RD)
  if (deviations.green && deviations.blue && deviations.red) {
    this.oldDeviationG = deviations.green
    this.oldDeviationB = deviations.blue
    this.oldDeviationR = deviations.red
  }

  // Volatilities (Sigma)
  if (volatilities.green && volatilities.blue && volatilities.red) {
    this.oldVolG = volatilities.green
    this.oldVolB = volatilities.blue
    this.oldVolR = volatilities.red
  }

  // Old Ratings
  if (oldRatings.green && oldRatings.blue && oldRatings.red) {
    this.oldRatingG = oldRatings.green
    this.oldRatingB = oldRatings.blue
    this.oldRatingR = oldRatings.red
  }

  // Glicko Score conversion
  this.glickoScoreGvB = ((Math.sin(((this.sG / (this.sG + this.sB)) - 0.5) * Math.PI) + 1) * 0.5)
  this.glickoScoreGvR = ((Math.sin(((this.sG / (this.sG + this.sR)) - 0.5) * Math.PI) + 1) * 0.5)
  this.glickoScoreBvR = ((Math.sin(((this.sB / (this.sB + this.sR)) - 0.5) * Math.PI) + 1) * 0.5)
  this.glickoScoreBvG = ((Math.sin(((this.sB / (this.sB + this.sG)) - 0.5) * Math.PI) + 1) * 0.5)
  this.glickoScoreRvG = ((Math.sin(((this.sR / (this.sR + this.sG)) - 0.5) * Math.PI) + 1) * 0.5)
  this.glickoScoreRvB = ((Math.sin(((this.sR / (this.sR + this.sB)) - 0.5) * Math.PI) + 1) * 0.5)

  // Mu
  this.muG = (this.oldRatingG - 1500) / 173.7178
  this.muB = (this.oldRatingB - 1500) / 173.7178
  this.muR = (this.oldRatingR - 1500) / 173.7178

  // Phi
  this.phiG = this.oldDeviationG / 173.7178
  this.phiB = this.oldDeviationB / 173.7178
  this.phiR = this.oldDeviationR / 173.7178

  // g
  this.gG = 1 / (Math.sqrt(1 + (3 * Math.pow(this.phiG, 2)) / Math.pow(Math.PI, 2)))
  this.gB = 1 / (Math.sqrt(1 + (3 * Math.pow(this.phiB, 2)) / Math.pow(Math.PI, 2)))
  this.gR = 1 / (Math.sqrt(1 + (3 * Math.pow(this.phiR, 2)) / Math.pow(Math.PI, 2)))

  // E
  this.EGvB = 1 / (1 + Math.exp(this.gB * (this.muB - this.muG)))
  this.EGvR = 1 / (1 + Math.exp(this.gR * (this.muR - this.muG)))
  this.EBvR = 1 / (1 + Math.exp(this.gR * (this.muR - this.muB)))
  this.EBvG = 1 / (1 + Math.exp(this.gG * (this.muG - this.muB)))
  this.ERvG = 1 / (1 + Math.exp(this.gG * (this.muG - this.muR)))
  this.ERvB = 1 / (1 + Math.exp(this.gB * (this.muB - this.muR)))

  // g^2.E(1-E)
  this.gSquareEGvB = Math.pow(this.gB, 2) * this.EGvB * (1 - this.EGvB)
  this.gSquareEGvR = Math.pow(this.gR, 2) * this.EGvR * (1 - this.EGvR)
  this.gSquareEBvR = Math.pow(this.gR, 2) * this.EBvR * (1 - this.EBvR)
  this.gSquareEBvG = Math.pow(this.gG, 2) * this.EBvG * (1 - this.EBvG)
  this.gSquareERvG = Math.pow(this.gG, 2) * this.ERvG * (1 - this.ERvG)
  this.gSquareERvB = Math.pow(this.gB, 2) * this.ERvB * (1 - this.ERvB)

  // g(s-E)
  this.gsEGvB = this.gB * (this.glickoScoreGvB - this.EGvB)
  this.gsEGvR = this.gR * (this.glickoScoreGvR - this.EGvR)
  this.gsEBvR = this.gR * (this.glickoScoreBvR - this.EBvR)
  this.gsEBvG = this.gG * (this.glickoScoreBvG - this.EBvG)
  this.gsERvG = this.gG * (this.glickoScoreRvG - this.ERvG)
  this.gsERvB = this.gB * (this.glickoScoreRvB - this.ERvB)

  // total g(s-E)
  this.gsETotalG = this.gsEGvB + this.gsEGvR
  this.gsETotalB = this.gsEBvR + this.gsEBvG
  this.gsETotalR = this.gsERvG + this.gsERvB

  // Nu
  this.nuG = 1 / (this.gSquareEGvB + this.gSquareEGvR)
  this.nuB = 1 / (this.gSquareEBvR + this.gSquareEBvG)
  this.nuR = 1 / (this.gSquareERvG + this.gSquareERvB)

  // **************** Calculations *********************
  // New Volatilities
  this.newVolG = this.new_sigma_falsep(this.oldVolG, this.phiG, this.nuG, this.gsETotalG, tau)
  this.newVolB = this.new_sigma_falsep(this.oldVolB, this.phiB, this.nuB, this.gsETotalB, tau)
  this.newVolR = this.new_sigma_falsep(this.oldVolR, this.phiR, this.nuR, this.gsETotalR, tau)

  // New Deviations
  this.newDeviationG = (1 / Math.sqrt(1 / (Math.pow(this.phiG, 2) + Math.pow(this.newVolG, 2)) + 1 / this.nuG)) * 173.7178
  this.newDeviationB = (1 / Math.sqrt(1 / (Math.pow(this.phiB, 2) + Math.pow(this.newVolB, 2)) + 1 / this.nuB)) * 173.7178
  this.newDeviationR = (1 / Math.sqrt(1 / (Math.pow(this.phiR, 2) + Math.pow(this.newVolR, 2)) + 1 / this.nuR)) * 173.7178

  // New Ratings
  this.newRatingG = (this.muG + Math.pow((this.newDeviationG / 173.7178), 2) * this.gsETotalG) * 173.7178 + 1500
  this.newRatingB = (this.muB + Math.pow((this.newDeviationB / 173.7178), 2) * this.gsETotalB) * 173.7178 + 1500
  this.newRatingR = (this.muR + Math.pow((this.newDeviationR / 173.7178), 2) * this.gsETotalR) * 173.7178 + 1500
}

// *************** Functions ********************
// Functions used by new sigma calculator:
WvWGlicko.prototype.Dequation = function (phi, nu, x, tau, delta) {
  // var d = Math.pow(phi, 2) + nu + Math.exp(x)
  // var dequation = -1 / Math.pow(tau, 2) - 0.5 * Math.exp(x) / d + 0.5 * Math.exp(x)  * (Math.exp(x) + Math.pow(delta, 2)) / Math.pow(d, 2) - Math.pow(Math.exp(x), 2) * Math.pow(delta, 2) / Math.pow(d, 3)
  // return dequation
  var d = phi * phi + nu + Math.exp(x)
  var dequation = -1 / tau * tau - 0.5 * Math.exp(x) / d + 0.5 * Math.exp(x) * (Math.exp(x) + delta * delta) / d ^ 2 - Math.exp(x) * Math.exp(x) * delta * delta / d * d * d
  return dequation
}

WvWGlicko.prototype.find_upper_falsep = function (phi, nu, delta, tau) {
  var x1, x2, x3, y1, y2, y3, upperFalsep
  y1 = this.Dequation(phi, nu, 0, tau, delta)
  if (y1 < 0) {
    upperFalsep = 1
  } else {
    x1 = 0
    do {
      x2 = x1
      y2 = y1
      x1 = x1 - 1
      y1 = this.Dequation(phi, nu, x1, tau, delta)
    } while (y1 > 0)
    for (var i = 0; i <= 20; i++) {
      x3 = y1 * (x1 - x2) / (y2 - y1) + x1
      y3 = this.Dequation(phi, nu, x3, tau, delta)
      if (y3 > 0) {
        x1 = x3
        y1 = y3
      } else {
        x2 = x3
        y2 = y3
      }
    }
    upperFalsep = Math.exp((y1 * (x1 - x2) / (y2 - y1) + x1) / 2)
  }
  return upperFalsep
}

// Helper with sigma calculator
WvWGlicko.prototype.equation = function (phi, nu, x, a, tau, delta) {
  var d = Math.pow(phi, 2) + nu + Math.exp(x)
  return -(x - a) / Math.pow(tau, 2) - 0.5 * Math.exp(x) / d + 0.5 * Math.exp(x) * Math.pow((delta / d), 2)
}

// New sigma calculator
WvWGlicko.prototype.new_sigma_falsep = function (sigma, phi, nu, delta, tau) {
  var a, x1, x2, x3, y1, y2, y3, upper, newSigma

  upper = this.find_upper_falsep(phi, nu, delta, tau)

  a = Math.log(sigma * sigma)
  y1 = this.equation(phi, nu, 0, a, tau, delta)

  if (y1 > 0) {
    newSigma = upper
  } else {
    x1 = 0
    do {
      x2 = x1
      y2 = y1
      x1 = x1 - 1
      y1 = this.equation(phi, nu, x1, a, tau, delta)
    } while (y1 < 0)
    for (var i = 0; i <= 20; i++) {
      x3 = y1 * (x1 - x2) / (y2 - y1) + x1
      y3 = this.equation(phi, nu, x3, a, tau, delta)
      if (y3 > 0) {
        x1 = x3
        y1 = y3
      } else {
        x2 = x3
        y2 = y3
      }
    }
    if (Math.exp((y1 * (x1 - x2) / (y2 - y1) + x1) / 2) > upper) {
      newSigma = upper
    } else {
      newSigma = Math.exp((y1 * (x1 - x2) / (y2 - y1) + x1) / 2)
    }
  }
  return newSigma
}

module.exports = WvWGlicko
