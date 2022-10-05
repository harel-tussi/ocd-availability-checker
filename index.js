(async () => {
  for (let i = 1; i < 365; i++) {
    let date = new Date();
    date.setDate(date.getDate() + i);
    let year = date.getFullYear();
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let day =
      date.getDate() + 1 < 10 ? "0" + (date.getDate() + 1) : date.getDate() + 1;
    const formatedDate = `${year}${month}${day}`;
    const times = ["1845", "2130"];
    for (let j = 0; j < times.length; j++) {
      const res = await fetch(
        "https://ontopo.co.il/api/availability/searchAvailability",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,he-IL;q=0.8,he;q=0.7",
            "cache-control": "no-cache",
            "content-type": "application/json",
            pragma: "no-cache",
            "sec-ch-ua":
              '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
          },
          referrer: "https://ontopo.co.il/ocd/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: `{"slug":"88542392","locale":"he","criteria":{"size":"2","date":"${formatedDate}","time":"${times[j]}"}}`,
          method: "POST",
          mode: "cors",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.method === "seat") console.log(date, times[i], "Available");
    }
  }
})();
