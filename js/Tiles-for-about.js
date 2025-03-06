document.addEventListener("DOMContentLoaded", function() {
    /* --- Registered Products Section Functions --- */
    window.expandRegCard = function(cardType) {
      var cardContainer = document.getElementById("reg-card-container");
      var expandedContainer = document.getElementById("reg-expanded-container");
  
      // Add fade-out effect to the registered products container
      cardContainer.classList.add("reg-fade-out");
  
      setTimeout(function() {
        cardContainer.style.display = "none";
        cardContainer.classList.remove("reg-fade-out");
  
        expandedContainer.innerHTML = getRegCardContent(cardType) +
          '<button class="back-btn" onclick="resetRegCards()">Back</button>';
        expandedContainer.style.display = "block";
      }, 300);
    };
  
    window.resetRegCards = function() {
      var cardContainer = document.getElementById("reg-card-container");
      var expandedContainer = document.getElementById("reg-expanded-container");
  
      expandedContainer.style.display = "none";
      cardContainer.style.display = "flex";
      cardContainer.style.opacity = "1";
    };
  
    function getRegCardContent(type) {
      switch (type) {
        case 'rrsp':
                    return `<h4>Registered Retirement Savings Plan (RRSP)</h4>
                            <p>RRSPs are a vital part of retirement planning. Designed by the federal government as an incentive to save for retirement, RRSPs offer a wide range of investment options and saving opportunities.</p>
                            <p>RRSPs offer tax savings by allowing taxes on funds earned to be deferred until a later date when the funds are withdrawn. Further tax savings may be possible using a Spousal RRSP to split future income between yourself and a lower-income earning spouse.</p>
                            <p>While designed for retirement, the government has also established programs to withdraw RRSPs to achieve other life goals, including education (Life Long Learning Plan) and home ownership (Homebuyer’s Plan).</p>`;
                case 'lira':
                    return `<h4>Locked-in Retirement Account (LIRA)</h4>
                            <p>LIRAs are similar in design and nature to RRSP accounts. The main difference is that LIRAs are designed specifically to hold locked-in pension funds of a former plan member, their spouse, or common-law partner.</p>
                            <p>Pension funds transferred to a LIRA cannot be cashed out but must be used to purchase a life annuity from an insurance company, transferred to a Life Income Fund (LIF), or to a Locked-In Retirement Income Fund (LRIF), providing a pension income for life.</p>
                            <p>The LIRA owner may purchase a life annuity at any age or transfer their pension funds to a LIF or LRIF at any time prior to the end of the year in which they turn 69 years of age.</p>`;
                case 'rrif':
                    return `<h4>Registered Retirement Income Fund (RRIF)</h4>
                            <p>RRIFs are used at retirement to move RRSP funds into a stream of retirement income. By transferring money from your RRSP into a RRIF contract, you can begin to receive funds on a monthly or annual basis.</p>
                            <p>RRIFs have a minimum amount that must be taken out each year as established by the Canada Revenue Agency, but no maximum limit is applied to RRIFs.</p>
                            <p>It should be noted that all RRSP funds need to be transferred either to a RRIF or an annuity account by the end of the year in which the plan holder turns 69.</p>`;
                case 'lif':
                    return `<h4>Locked-in Income Fund (LIF)</h4>
                            <p>Similar to RRIFs, LRIFs and LIFs are purchased with \"locked-in\" retirement funds such as another LIF, LIRA, or \"locked-in\" pension fund transfers.</p>
                            <p>LRIFs/LIFs provide the holder with an annual retirement income and have both a minimum and a maximum amount that may be withdrawn within a calendar year.</p>
                            <p>Each province has its own pension legislation and regulations regarding transfers into LRIFs and LIFs to protect the funds from being used before retirement.</p>`;
                case 'tfsa':
                    return `<h4>Tax-Free Savings Account (TFSA)</h4>
                            <p>TFSAs are flexible investment accounts that allow you to contribute after-tax dollars while providing an environment for your capital to grow tax-free indefinitely.</p>
                            <ul>
                                <li><strong>Investment income:</strong> Interest, dividends, or capital gains provide for tax-free compound growth, which means your money will grow faster than in a regular savings account.</li>
                                <li><strong>Contributions:</strong> Annual contribution limit is $5,500, which typically increases with inflation in $500 increments, and unused contribution room can be carried forward indefinitely.</li>
                                <li><strong>Eligibility:</strong> Canadian residents over the age of 18 with a Social Insurance Number can open a TFSA.</li>
                                <li><strong>Income requirements:</strong> None.</li>
                                <li><strong>Tax benefits:</strong> While the contributions are made with after-tax dollars, all returns grow tax-free.</li>
                                <li><strong>Withdrawals:</strong> Withdrawals are tax-free, and you can re-contribute withdrawals within a calendar year without affecting your contribution limit.</li>
                                <li><strong>Investment options:</strong> TFSAs are extremely flexible and allow you to invest in mutual funds, stocks, or bonds.</li>
                            </ul>`;
                default:
                    return '';
            }
    }
  
    /* --- Tax & Estate Planning Section Functions --- */
    window.expandTaxCard = function(cardType) {
      var cardContainer = document.getElementById("tax-card-container");
      var expandedContainer = document.getElementById("tax-expanded-container");
  
      // Add fade-out effect to the tax container
      cardContainer.classList.add("tax-fade-out");
  
      setTimeout(function() {
        cardContainer.style.display = "none";
        cardContainer.classList.remove("tax-fade-out");
  
        expandedContainer.innerHTML = getTaxCardContent(cardType) +
          '<button class="back-btn" onclick="resetTaxCards()">Back</button>';
        expandedContainer.style.display = "block";
      }, 300);
    };
  
    window.resetTaxCards = function() {
      var cardContainer = document.getElementById("tax-card-container");
      var expandedContainer = document.getElementById("tax-expanded-container");
  
      expandedContainer.style.display = "none";
      cardContainer.style.display = "flex";
      cardContainer.style.opacity = "1";
    };
  
    function getTaxCardContent(type) {
        switch (type) {
            case 'taxation':
                return `<h4>Business Taxation</h4>
                        <p>Taxation is an important issue to all Canadian business owners and operators. WPG can help you plan and implement optimal tax strategies based on your corporation's unique position and structure.</p>`;
            case 'tax-planning':
                return `<h4>Taxation Planning</h4>
                        <p>Whether personal or corporate, we can help you develop an efficient tax planning strategy that will enable you to decrease your taxes.</p>`;
            case 'tax-return':
                return `<h4>Tax Return Preparation</h4>
                        <p>Our team has extensive experience in personal and corporate tax return preparation.</p>`;
            case 'estate':
                return `<h4>Estate Planning</h4>
                        <p>Plan for asset protection, smooth transfers, and minimizing taxes for your beneficiaries.</p>`;
            default:
                return '';
        }
    }
  });
  