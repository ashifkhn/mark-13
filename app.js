const dateInput=document.querySelector("#date")
const checkBtn=document.querySelector(".btn")
const output=document.querySelector(".output")


function reverseString(str) {
  // var characterList=str.split("")
  // var reverseList=characterList.reverse()
  // var reversedString=reverseList.join("")
  return str.split("").reverse().join("");
}

function palindrome(str) {
  var reversed = reverseString(str);
  return str === reversed;
}

function convertDate(date) {
  var dateString = {
    day: "",
    month: "",
    year: "",
  };

  if (date.day < 10) {
    dateString.day = "0" + date.day;
  } else {
    dateString.day = date.day.toString();
  }

  if (date.month < 10) {
    dateString.month = "0" + date.month;
  } else {
    dateString.month = date.month.toString();
  }

  dateString.year = date.year.toString();
  return dateString;
}

function dateFormats(date) {
  var dateString = convertDate(date);
  var ddmmyyyy = dateString.day + dateString.month + dateString.year;
  var mmddyyyy = dateString.month + dateString.day + dateString.year;
  var yyyymmdd = dateString.year + dateString.month + dateString.day;
  var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
  var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
  var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function palindromeChecker(date) {
  var listOfPalindromes = dateFormats(date);
  var flag = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (palindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function leapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 4 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  return false;
}

function nextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (leapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      } 
    }
      else {
        if (day > 28) {
          day = 1;
          month++;
        }
    }
  } 
  else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if(month>12){
      month=1;
      year++;
  }
  return {day:day,
        month:month,
        year:year
}
}

function nextPalindrome(date) {
    var count=0;
    var getNextDate=nextDate(date)
    while(1){
        count++;
        var isPalindrome=palindromeChecker(getNextDate);
        if(isPalindrome){
            break
        }
        getNextDate=nextDate(getNextDate);
    }
    return[count,getNextDate]
}

function clickHandler(event){
    var birthdayString=dateInput.value
    if(birthdayString!==''){
        var listDay=birthdayString.split('-')
        var date={
            day:Number(listDay[2]),
            month:Number(listDay[1]),
            year:Number(listDay[0])
        }


        var isPalindrome=palindromeChecker(date)
        if(isPalindrome){
            output.innerText="Your Bithday is a palindrome."
        }

        else{
            var [count,getNextDate]=nextPalindrome(date);
            output.innerText=`Next pallindrome is ${getNextDate.day}-${getNextDate.month}-${getNextDate.year}, You missed it by ${count} days`
        }

    }

}

checkBtn.addEventListener('click',clickHandler)