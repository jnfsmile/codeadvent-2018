let ut1 = (input => twoLetter(input))(`abcdef`);
assert(ut1 === false);

let ut2 = (input => twoLetter(input))(`bababc`);
assert(ut2 === true);

let ut3 = (input => twoLetter(input))(`abbcde`);
assert(ut3 === true);

let ut4 = (input => twoLetter(input))(`abcccd`);
assert(ut4 === false);

let ut5 = (input => twoLetter(input))(`aabcdd`);
assert(ut5 === true);

let ut6 = (input => twoLetter(input))(`abcdee`);
assert(ut6 === true);

let ut7 = (input => twoLetter(input))(`ababab`);
assert(ut7 === false);

let ut1_1 = (input => threeLetter(input))(`abcdef`);
assert(ut1_1 === false);

let ut2_1 = (input => threeLetter(input))(`bababc`);
assert(ut2_1 === true);

let ut3_1 = (input => threeLetter(input))(`abbcde`);
assert(ut3_1 === false);

let ut4_1 = (input => threeLetter(input))(`abcccd`);
assert(ut4_1 === true);

let ut5_1 = (input => threeLetter(input))(`aabcdd`);
assert(ut5_1 === false);

let ut6_1 = (input => threeLetter(input))(`abcdee`);
assert(ut6_1 === false);

let ut7_1 = (input => threeLetter(input))(`ababab`);
assert(ut7_1 === true);

function twoLetter(id) {
  return numLetter(id, 2);
}
function threeLetter(id) {
  return numLetter(id, 3);
}

function numLetter(id, num) {
  let str = id;
  const hash = {};
  while (str.length) {
    const ch = str[0];
    hash[ch] = hash[ch] !== undefined ? (hash[ch] += 1) : 1;
    str = str.slice(1);
  }
  for (let ch in hash) {
    if (hash.hasOwnProperty(ch)) {
      if (hash[ch] === num) return true;
    }
  }
  return false;
}

const input = `myhposlqgeauywfikztndcvrqr
mbhposlxfeauywoikztndcvjqi
mbhpoulxgeagywfikytndcvjqr
jbhposlxgeauywdikztndcvjqk
mbhpsslxueauywfikzfndcvjqr
mbhposnxgeauzyfikztndcvjqr
ibhposlxgetvywfikztndcvjqr
mbcposlxgeauywfikztxdcvjqv
mlhposltgeauywfikitndcvjqr
mbhpostxgeauywfikztndjvjqy
mboboslxglauywfikztndcvjqr
mbhpoglxgeahywfikztndcvjqp
mbhposlxgeapydpikztndcvjqr
mbhposlxseauywfikztnncljqr
mbhposlxgeauydfisztndcvjqj
mbhposlxgeaugwwikzlndcvjqr
mbhpoklxgeauywfikztndvvmqr
mbhposlxgeauywfikdtndcmjqx
mbhposlxaeauapfikztndcvjqr
mbwposgxgeauymfikztndcvjqr
mbhposlxgeauvwfirzcndcvjqr
mbhpozlxgeaqywfykztndcvjqr
mahqoslxgeauywfikzgndcvjqr
mbhposlcgexbywfikztndcvjqr
ykhposlxgeeuywfikztndcvjqr
mbhgoswxgeauywfikztndhvjqr
mbhposlxgeauywfikztnocmjqp
mbvposfageauywfikztndcvjqr
mbhpnslxgeauywfikztndgejqr
mblposfxgeauypfikztndcvjqr
mbhposlxyeauywfikzpndcvmqr
ibhposlbgeauywfikotndcvjqr
mbmposlxgeauywfiktwndcvjqr
mbhposlxgeduywfikztndfvoqr
mbhpoklxdeauywfikztndcvuqr
mbhposlxgeauywfikltnlcvuqr
mbhposlbgsauywfikztndsvjqr
mbhposlxgeauywfirzfndcbjqr
mphposlxgeauywfikztndcvjgg
mohposlcgeauywfikzsndcvjqr
mbhpovlxgeauyqfikotndcvjqr
qbhpgslxgeauywqikztndcvjqr
mbhposlxweauywfikztndtvjqm
pbhposlxgeauywfikztnncvjqm
mbbposlxpeauuwfikztndcvjqr
mbhposlxgmauyrfikztndcvjir
pbhposlqgefuywfikztndcvjqr
mbhkoslxgeauywfikztndciwqr
mbtpoflxgeauywfikztndrvjqr
mbhcoslxveguywfikztndcvjqr
mbhpovlxgeauywfhkdtndcvjqr
mbhposlxgeauywftrztndcujqr
mbhposlxgeaoywfdkzpndcvjqr
mbnposlxgeyuywfikztldcvjqr
mbaposlxweauywfikftndcvjqr
mbhposljgeauywfikztcdcvvqr
nbhpkslxgeauywfikzwndcvjqr
mbhtoslxgeauywfikzkndcvjdr
mbhposxxgeaxywfikztndsvjqr
mbdpoflxgeauywfisztndcvjqr
mbhposvxgeauywfikztnscvnqr
mbcposlxghauywfikztndcgjqr
mbhpovlxgeauywpckztndcvjqr
mbhpfslxgeauywbikntndcvjqr
mbhpowyxgeauywfikztndcvjcr
mbhposlxoeatywfikztndcvoqr
mchpfslxgeauywfikztidcvjqr
mbhposvxgearywfikztndcvjcr
mbhposlxgeauywfpcztnduvjqr
mbhposlxgmauyyfiqztndcvjqr
mbhposlxteauuwfikwtndcvjqr
mbhpotlspeauywfikztndcvjqr
mbhpoelxgeauywfikztndckjkr
mbhpnslxgeauywfikztndcvkqs
mbhpksfxgwauywfikztndcvjqr
mxhwoglxgeauywfdkztndcvjqr
mbhphsbjgeauywfikztndcvjqr
mbhposlxgeauwifixztndcvjqr
mbhposqxguauywfikztndcwjqr
mbhposlngeauywfikztedcvjor
nbhposlxgeauywiikztndcyjqr
mbhposlxgeauawfykztndcvbqr
mbhplslxgeauywcikztndcvjrr
fshposlxgeagywfikztndcvjqr
mbhposlxgeauymcikztndcxjqr
mbhponlxgeauyloikztndcvjqr
mbhposrxzeanywfikztndcvjqr
mbhtoslxgeajyifikztndcvjqr
mbhposixkeauywfikhtndcvjqr
mahhoslxgeaufwfikztndcvjqr
mbhpdslxteauywfikzvndcvjqr
mfhposlxgeauywfiqttndcvjqr
mbhplslxheauywfikztnscvjqr
mbhpoylxgeauywbizztndcvjqr
mbhposlhgeawywfjkztndcvjqr
mbhkoslxgkauywfilztndcvjqr
mbhposnxgeauywfikztkdcvlqr
mvhpxslxgevuywfikztndcvjqr
mbhpohlxgeauyrficztndcvjqr
mbhsosuxgewuywfikztndcvjqr
mbhpoxlxgeauywuikztnhcvjqr
mbhposlxqeauyqfikztndcvrqr
mbhpchlxgeauywfikztnhcvjqr
mbhposlxgeauywoikztndcfqqr
pbhposlxgeagmwfikztndcvjqr
mxhwoglxgeauywfikztndcvjqr
mbhpospxgaauywfikstndcvjqr
mbhwoxlxgeauywfgkztndcvjqr
mbhposlxgeauywfikvtndhvsqr
mbbposlxgesuywfikztnicvjqr
mhhjoslxgeauywfikztndccjqr
mbhkoslxgeagywffkztndcvjqr
mbhposlxgesqywfukztndcvjqr
mbdposlxgeauywfilztndcvjqp
mbhposlxgeakqwfikztedcvjqr
mbhposuxgeayywficztndcvjqr
mbhposlxgeauywfxkztndcloqr
mchposlxgeauywoiiztndcvjqr
tbhporlxgeauywfikztndcvyqr
mbhposlxoevuywfikzindcvjqr
qbhposlxfevuywfikztndcvjqr
mbhposlxfeauvwfikztndcvgqr
mbjposlxgsauywfikztnwcvjqr
vbhposlxgeauvwfikztndcvjqk
pbhposlxguauyrfikztndcvjqr
mbhposlcgeauywfiketndcviqr
mbsposlxgvauywfikztndcviqr
mbhposlxgeauynfxkztndcvjbr
mbhposlxtentywfikztndcvjqr
mbhposlxgeavywfikztndhvjnr
mbhpsvlxgeauywfikztndcvzqr
mzhpotlxgeauywfiyztndcvjqr
mbhposkqgeauywfiwztndcvjqr
mbhposlxoeakywfikztndcvjqt
mbhposlxghauywfikbdndcvjqr
mbhpossxgeauywfikqxndcvjqr
mbhposlxgearywhikztydcvjqr
mbhposlxgeaiywfikztndfvjur
mbhpxslxgoazywfikztndcvjqr
mbhposlxneauywfibqtndcvjqr
mnheoslxteauywfikztndcvjqr
mbhposlxgeauywfmkztrdcvuqr
mbhzowlxgeauywfizztndcvjqr
mbhloslxgeauyofikztnucvjqr
mbhposlxneagywfbkztndcvjqr
mbhposongeauywfikztnzcvjqr
mwyposlxgeauywfikztnqcvjqr
mbhpnqaxgeauywfikztndcvjqr
mboposlxzeauywfioztndcvjqr
mbhposledeauywfikztndqvjqr
mphpaslxgeauywfbkztndcvjqr
mbhposrxgeauywlikbtndcvjqr
ybhnoslxgeauywfihztndcvjqr
mbhposlxgeauywfikntxccvjqr
mbhposlxgeauqwfikutndcfjqr
mbhposlxglabywfikztidcvjqr
mbhpollxgeauywfikxtnscvjqr
mboposlggeaufwfikztndcvjqr
mbhposlxgeauywpikedndcvjqr
mbhpoklxgeauywpikztndcvjlr
mbhposhxgeauywfifztndcvpqr
mbhposlxgwagywfikztndcvjwr
mbhpokldgeauywfikztngcvjqr
nbhposlxgeauywfiketndcvjxr
mbhhoslxgexuywfikrtndcvjqr
mbhposlxgefujwfikztkdcvjqr
mbhposlxggagywfikztndchjqr
mbhposlxgeauyvfilztnicvjqr
mbhposlkgeauywfikzxndcvoqr
mbhposlxgeauvqfikztndcvuqr
zbhposlxgfauylfikztndcvjqr
mbhyoshxgeauywfikztndcvjqa
sbhposlxgeauyxfikztndavjqr
mlhposlxgeauywfikzmndcqjqr
mbhpaslxgekuywfikztnncvjqr
ibhhoslxteauywfikztndcvjqr
mbhposlxgeauyodibztndcvjqr
mbhposlxgkaoywfikztndcvpqr
mbhonslxgearywfikztndcvjqr
mbdpoolxgealywfikztndcvjqr
mbepfslxgvauywfikztndcvjqr
mbhposlygeauywfikztfdcvaqr
mthpoalxgeauywnikztndcvjqr
mbhpesbogeauywfikztndcvjqr
mbhposlxgjauywfikztnmcvjqj
mbhnoslxgeauydfikgtndcvjqr
mbhpxslxgeauywfikztndcvjcx
muhposlxgwauywfipztndcvjqr
mbhpcslxgeauywfiqztndcvjbr
mbhpomlxgeauywfioftndcvjqr
mbhposlfgepuywfikzmndcvjqr
mbhsosliteauywfikztndcvjqr
mbwposlxgeauywfikztnycveqr
mbhpfslxgeauywfqkztndcvjhr
mxhbvslxgeauywfikztndcvjqr
fbhposlxgeauywfikzcnmcvjqr
mbhfosfxgeauywfikztnduvjqr
tbhporlxgeauywfikztndcvjqm
mhhposlxgeauywfikctnecvjqr
mbhposlxgeqtywfikztnmcvjqr
qbhpjslxgeauywfikztndevjqr
tbhpxslxgeaunwfikztndcvjqr
wbhposlxgeadywfikztndcujqr
mbhposlvgeauywfpkotndcvjqr
mbhposlxgeagywfingtndcvjqr
mbnposlxgeauywfikztnvcjjqr
mohpoilxgeadywfikztndcvjqr
mbhposlsgeauywfikztnxcvgqr
mbhposlogeauywfikqtndcvjor
mbhroslxgeauypfikztndcvjqg
mblposuxgetuywfikztndcvjqr
mbhposlogeiuywfikztodcvjqr
mbhposlxgeauylfikztedcvrqr
mbhfoslxgeautwxikztndcvjqr
mbhouslxgeauywfikztnycvjqr
mbhposlxgeauywfvkqtndlvjqr
mbfposltgeauytfikztndcvjqr
mbhposlxgcapywfikztnddvjqr
hbhposlxgeasywfikztnxcvjqr
mbhposntgeauywfikztcdcvjqr
mbhponlxgfauywfirztndcvjqr
mbhposlxgeatywlikztndcvrqr
mohroslzgeauywfikztndcvjqr
mbhpojaxgeauywfifztndcvjqr
rbhposlxgwauywfikztndovjqr
mbhpoclxgeaeywfikztndcvjqo
mbhposllgeauywfikzondcvmqr
mbhpxslxgeauywfikzymdcvjqr
mbhposlxgeasywxikztndkvjqr
mbhposlxgeauywfivztndcmjqx
qbhposlxgpauywfikgtndcvjqr
mbhposlxgeauyqdikztqdcvjqr
cbhposlxgeauywfikttjdcvjqr
mbhgoslxgeanywfihztndcvjqr
mbhposlxgeajywfhkztndcvjvr
mbhpozlxgeauewfmkztndcvjqr
mbhposlxgeagywfbiztndcvjqr
mbhmoslxgeauywfikztndrnjqr
ybhposmxgeauywfikztndcviqr
mrwposlxgeauywfikztndpvjqr
mbhposlxneauywfikztndcbjqh
mbhpowlxheauywfikztndcojqr
mbeposlxgeauywfiwztnycvjqr
mbhposixgeapywfikztndcvvqr
mbhposlxgeauywfikztnbcvjap
mzhposixgenuywfikztndcvjqr
mbhposgxgeauywyikztndvvjqr
mbhposajgeauywfikztzdcvjqr
mbhyoslxgeauywfikzsndcvxqr
mbhposlxgdauywfikmtndcljqr`;

function checksum(idList) {
  const count2 = idList
    .split("\n")
    .map(id => (twoLetter(id) ? 1 : 0))
    .reduce((s, n) => s + n, 0);
  const count3 = idList
    .split("\n")
    .map(id => (threeLetter(id) ? 1 : 0))
    .reduce((s, n) => s + n, 0);
  return count2 * count3;
}

console.log(checksum(input));

/*************
 * part 2
 */

const ut8 = (input => simiHash(input))(`abcde`);
assert(ut8.abcd);
assert(ut8.abce);
assert(ut8.abde);
assert(ut8.acde);
assert(ut8.bcde);

function simiHash(id) {
  const hash = {};
  for (let i = 0; i < id.length; i++) {
    if (i > 0) {
      hash[id.substring(0, i) + id.substring(i + 1)] = true;
    } else {
      hash[id.substring(i + 1)] = true;
    }
  }
  return hash;
}

function simiIds(ids) {
  const inputArr = ids.split("\n");
  let hash = {};
  for (let i = 0; i < inputArr.length; i++) {
    const newHash = simiHash(inputArr[i]);
    for (let s in newHash) {
      if (newHash.hasOwnProperty(s)) {
        if (hash[s]) return s;
      }
    }
    hash = Object.assign(newHash, hash);
  }
}

console.log(simiIds(input));
