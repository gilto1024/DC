var restList = (function () {
    var rest = [
        {
            "name":"Café Italia",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"bright",
            "vol":"loud",
            "parking":"yes",
            "Tel":"03-5612888",
            "Address":"Kremintzki 6",
            "Site":"http://www.mouse.co.il/CM.food_item_place,382,213,8464,.aspx",
			"tip":""
        },
        {
            "name":"Brasserie",
            "date":[
                "no"
            ],
            "so":[
                "friends",
                "family",
                "business"
            ],
            "sitting":[
                "table"
            ],
            "light":"bright",
            "vol":"loud",
            "parking":"valet",
            "Tel":"03-6967111",
            "Address":"Ibn Gabirol 70",
            "Site":"http://www.brasserie.co.il/",
			"tip":"Busy, central, never fails. The frenchiest french fries in town."
        },
        {
            "name":"Mizlala",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"no",
            "Tel":"03-5665505",
            "Address":"Nahalat Binyamin 57",
            "Site":"http://www.mizlala.co.il",
			"tip":"Great food with friends, intriguing bar for a date."
        },
        {
            "name":"Cantina",
            "date":[
                "no"
            ],
            "so":[
                "friends",
                "family",
                "business"
            ],
            "sitting":[
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"yes",
            "Tel":"03-6205051",
            "Address":"Rothschild 71",
            "Site":"http://www.mouse.co.il/CM.food_item_place,382,213,4178,.aspx",
			"tip":"Quiet atmosphere, good italian food."
        },
        {
            "name":"Catit",
            "date":[
                "yes"
            ],
            "so":[
                ""
            ],
            "sitting":[
                "table"
            ],
            "light":"bright",
            "vol":"quiet",
            "parking":"yes",
            "Tel":"03-5107001",
            "Address":"Heichal HaTalmud 4",
            "Site":"http://www.catit.co.il/",
			"tip":"Chef Meir Adoni. Fine dining at it's best."
		},
        {
            "name":"Yafo Tel-Aviv",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"yes",
            "Tel":"03-6249249",
            "Address":"Yigal Alon 98",
            "Site":"http://www.yaffotelaviv.com/",
			"tip":"A serious place. Think \"special event.\""
        },
        {
            "name":"Messa",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "business"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"yes",
            "Tel":"03-6856859",
            "Address":"HaArba'a 19",
            "Site":"http://www.messa.co.il",
			"tip":"Heavy business, fine dining."
        },
        {
            "name":"Joya",
            "date":[
                "no"
            ],
            "so":[
                "friends",
                "family",
                "business"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"bright",
            "vol":"quiet",
            "parking":"yes",
            "Tel":"03-6425854",
            "Address":"HaArba'a 5",
            "Site":"http://www.joya.co.il/he/home/default.aspx",
			"tip":"Casual Italian, quiet and simple."
        },
        {
            "name":"Herbert Samuel",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "family",
                "tourists",
                "business"
            ],
            "sitting":[
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"yes",
            "Tel":"03-5166516",
            "Address":"Kaufmann 6",
            "Site":"http://herbertsamuel.co.il/default.asp?PageID=5",
			"tip":"Great food, facing the sunset."
        },
        {
            "name":"Raphael",
            "date":[
                "no"
            ],
            "so":[
                "friends",
                "family",
                "business",
                "tourists"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"yes",
            "Tel":"03-5226464",
            "Address":"Yarkon 87",
            "Site":"http://raphaeltlv.co.il/",
			"tip":"Fine dining with a great view."
        },
        {
            "name":"Onami",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"bright",
            "vol":"quiet",
            "parking":"yes",
            "Tel":"03-5621172",
            "Address":"HaArba'a 18",
            "Site":"http://www.onami.co.il/he/home/default.aspx",
			"tip":"As Japanese as it gets. Get a Choya on the bar."
        },
        {
            "name":"Tapeo",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"loud",
            "parking":"yes",
            "Tel":"03-6240484",
            "Address":"HaArba'a 16",
            "Site":"http://www.tapeo.co.il/he/TLV/home.aspx",
			"tip":"Well established tapas place, for happy hour with good friends."
        },
        {
            "name":"Turkiz",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family",
                "tourists"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"bright",
            "vol":"loud",
            "parking":"yes",
            "Tel":"03-6996306",
            "Address":"Rosenblum 6",
            "Site":"http://www.turkiz-rest.co.il/",
			"tip":"Ocean view with a rich mood."
        },
        {
            "name":"Boya",
            "date":[
                "no"
            ],
            "so":[
                "friends",
                "family",
                "tourists"
            ],
            "sitting":[
                "table"
            ],
            "light":"bright",
            "vol":"quiet",
            "parking":"yes",
            "Tel":"03-5446166",
            "Address":"HaTa'arucha 3",
            "Site":"http://www.boya.co.il/",
			"tip":"Tel Aviv port for Tourists."
        },
        {
            "name":"Dallal",
            "date":[
                "no"
            ],
            "so":[
                "friennds",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"yes",
            "Tel":"03-5109292",
            "Address":"Shabazi 10",
            "Site":"http://www.dallal.info/restIndex3.asp?pageId=31",
			"tip":""
        },
        {
            "name":"Suzanna",
            "date":[
                "no"
            ],
            "so":[
                "friends",
                "family",
                "tourists"
            ],
            "sitting":[
                "table"
            ],
            "light":"bright",
            "vol":"loud",
            "parking":"yes",
            "Tel":"03-5177580",
            "Address":"Shabazi 9",
            "Site":"http://www.mouse.co.il/CM.food_item_place,383,213,5644,.aspx",
			"tip":"Local food with a busy vibe."
        },
        {
            "name":"Social Club",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"loud",
            "parking":"no",
            "Tel":"03-5601114",
            "Address":"Rothschild 45",
            "Site":"http://socialclub.rest.co.il/he/home/default.aspx",
			"tip":"Sexy Rothschild at it's best."
        },
        {
            "name":"Makom Shel Basar",
            "date":[
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"no",
            "Tel":"03-5104020",
            "Address":"Shabazi 64",
            "Site":"http://www.mouse.co.il/CM.Food_Item_Place,382,213,7938,.aspx",
			"tip":"Great meat, no doubt. Even better vibe. "
        },
        {
            "name":"Vicki Cristina",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family",
                "tourists"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"loud",
            "parking":"yes",
            "Tel":"03-7367272",
            "Address":"Kaufmann 2",
            "Site":"http://www.vicky-cristina.co.il/",
			"tip":"Tourist venue, fun nonetheless."
        },
        {
            "name":"Abraxas North",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"loud",
            "parking":"no",
            "Tel":"03-5166660",
            "Address":"Lilienblum 40",
            "Site":"http://www.abraxas.co.il/",
			"tip":"One of the best, yet surprisingly loud. Take a taxi."
        },
        {
            "name":"Zepra",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"yes",
            "Tel":"03-6240044",
            "Address":"Yigal Alon 96",
            "Site":"http://zepra.co.il/",
			"tip":"Daring Asian food, also fun on the bar. Try the tasting menu."
        },
        {
            "name":"Nanuchka",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"loud",
            "parking":"no",
            "Tel":"03-5162254",
            "Address":"Lilienblum 30",
            "Site":"https://www.facebook.com/nanuchkatlv",
			"tip":"Authentic Georgian food, great bar."
        },
        {
            "name":"Port Said",
            "date":[
                "no"
            ],
            "so":[
                "friends"
            ],
            "sitting":[
                "table"
            ],
            "light":"bright",
            "vol":"loud",
            "parking":"yes",
            "Tel":"03-6207436",
            "Address":"Har Sinai 2",
            "Site":"https://www.facebook.com/pages/Port-Said/193302427463816",
			"tip":"Friends and good street food, unique and simple Tel Aviv. No reservations."
        },
        {
            "name":"Kalamata",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family",
                "tourists"
            ],
            "sitting":[
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"no",
            "Tel":"03-6819998",
            "Address":"Kikar Kdumim 10, Yafo",
            "Site":"http://www.kalamata.co.il/",
			"tip":"Greek Jaffa, ask for a table with a view."
        },
        {
            "name":"Hotel Montefiore",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "business"
            ],
            "sitting":[
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"no",
            "Tel":"03-5646100",
            "Address":"Montefiore 36",
            "Site":"http://www.hotelmontefiore.co.il/restaurant",
			"tip":"Iconic part of Tel Aviv. Do not miss out on the tart tatin!"
        },
        {
            "name":"Elba",
            "date":[
                "yes"
            ],
            "so":[
                ""
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"yes",
            "Tel":"03-5467905",
            "Address":"Ibn Gabirol 36",
            "Site":"https://www.facebook.com/ELBA.RESTAURANT",
			"tip":"Romantic, open, glass wall, facing busy Tel Aviv."
        },
        {
            "name":"Café Europa",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"loud",
            "parking":"yes",
            "Tel":"03-5259987",
            "Address":"Rothschild 9",
            "Site":"http://www.mouse.co.il/CM.food_item_place,382,213,11158,.aspx",
			"tip":"Open front to Roshchild blvd. Young and vibrant."
        },
        {
            "name":"Hatzer Goldman",
            "date":[
                "no"
            ],
            "so":[
                "friends",
                "family",
                "tourists"
            ],
            "sitting":[
                "table"
            ],
            "light":"bright",
            "vol":"loud",
            "parking":"no",
            "Tel":"03-6822111",
            "Address":"Goldman 6",
            "Site":"http://www.goldmanc.co.il/home.php",
			"tip":""
        },
        {
            "name":"Shila",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"loud",
            "parking":"valet",
            "Tel":"03-5221224",
            "Address":"Ben Yehuda 182",
            "Site":"http://www.shila-rest.co.il/",
			"tip":"Dim & loud at it's very best in Tel Aviv."
        },
        {
            "name":"Tapas 1 ha'am",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"loud",
            "parking":"valet",
            "Tel":"03-5666966",
            "Address":"Ehad Ha'am 27",
            "Site":"http://herbertsamuel.co.il/default.asp?PageID=6",
			"tip":"Warm & Spanish, don't miss out on the valet parking."
        },
        {
            "name":"Sola",
            "date":[
                "yes"
            ],
            "so":[
                ""
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"no",
            "Tel":"03-5499626",
            "Address":"Beit Eshel 31",
            "Site":"https://www.facebook.com/pages/Sola-Food-Wine-Bar/247225912061993",
			"tip":"Quaint, romantic. High class Jaffa."
        },
        {
            "name":"Taizu",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "family",
                "friends"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"loud",
            "parking":"no",
            "Tel":"03-5225005",
            "Address":"Begin 23",
            "Site":"https://www.facebook.com/TaizuRestaurant",
			"tip":"Uniquely Asian, in true Tel Aviv style."
        },
        {
            "name":"Juz & Luz",
            "date":[
                "yes"
            ],
            "so":[
                ""
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"no",
            "Tel":"03-5606385",
            "Address":"Yehuda Halevi 51",
            "Site":"http://www.mouse.co.il/CM.Food_Item_Place,384,213,3988,.aspx",
			"tip":"Quality Asian with a reputation for hipster lesbo-chic."
        },
        {
            "name":"Toto",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "family",
                "friends"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"loud",
            "parking":"yes",
            "Tel":"03-6935151",
            "Address":"Berkovich 4",
            "Site":"http://www.toto-rest.co.il/",
			"tip":"Winner food combinations, less obvious location."
        },
        {
            "name":"Mel & Michelle",
            "date":[
                "yes"
            ],
            "so":[
                ""
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"yes",
            "Tel":"03-5293232",
            "Address":"Ben Yehuda 155",
            "Site":"http://www.mel-michelle.co.il/",
			"tip":"Romantic date with great food. Try the Roman Gniocchi."
        },
        {
            "name":"Mitbach Laila",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends"
            ],
            "sitting":[
                "bar"
            ],
            "light":"dim",
            "vol":"loud",
            "parking":"no",
            "Tel":"03-5660481",
            "Address":"Lilienblum 43",
            "Site":"http://www.nightkitchen.co.il/",
			"tip":"Bar feel, great food."
        },
        {
            "name":"Yassou",
            "date":[
                "no"
            ],
            "so":[
                "friends"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"bright",
            "vol":"loud",
            "parking":"no",
            "Tel":"03-6031719",
            "Address":"Yarkon 105",
            "Site":"http://www.yassoutelaviv.co.il/",
			"tip":"Great view of the Tel Aviv promenade."
        },
        {
            "name":"Flee Market",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family",
                "tourists"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"bright",
            "vol":"loud",
            "parking":"no",
            "Tel":"03-6202262",
            "Address":"Rabbi Yohanan 8",
            "Site":"https://www.facebook.com/pages/Fleamarket-Restaurant-%D7%9E%D7%A1%D7%A2%D7%93%D7%AA-%D7%A4%D7%9C%D7%99%D7%9E%D7%A8%D7%A7%D7%98/105537962947115",
			"tip":"Hipster end of Jaffa flee market. Fun bar."
        },
        {
            "name":"Kitchen Market",
            "date":[
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"bright",
            "vol":"loud",
            "parking":"paid",
            "Tel":"03-5446669",
            "Address":"Hangar 12, Nemal Tel Aviv",
            "Site":"http://www.kitchen-market.co.il/",
			"tip":"Good sea food, overlooking the redesigned port of Tel Aviv."
        },
        {
            "name":"Alma",
            "date":[
                "yes"
            ],
            "so":[
                ""
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"no",
            "Tel":"03-6308777",
            "Address":"Yavne 23",
            "Site":"http://www.almahotel.co.il/alma-lounge-dining",
			"tip":"The classiest lounge on Rothschild."
        },
        {
            "name":"HaShulchan",
            "date":[
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"bright",
            "vol":"loud",
            "parking":"no",
            "Tel":"03-5257171",
            "Address":"Rothschild 73",
            "Site":"http://www.mouse.co.il/CM.food_item_place,382,213,10774,.aspx",
			"tip":"Sit in the balcony."
        },
        {
            "name":"Popina",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"valet",
            "Tel":"03-5757477",
            "Address":"Ehad Ha'am 3",
            "Site":"https://www.facebook.com/PopinaTelAviv",
			"tip":"The sophisticated, thin line between Tel Aviv and Neve Tzedek."
        },
        {
            "name":"Cocina Tamar",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "table"
            ],
            "light":"bright",
            "vol":"quiet",
            "parking":"yes",
            "Tel":"03-6390407",
            "Address":"HaTsfira 10",
            "Site":"http://www.mouse.co.il/CM.Food_Item_Place,382,213,4033,.aspx",
			"tip":"Quaint food, simple & honest mood."
        },
        {
            "name":"Coffee Bar",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "family",
                "Friends",
                "Business"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"bright",
            "vol":"quiet",
            "parking":"no",
            "Tel":"03-6889696",
            "Address":"Yad Haruzim 13",
            "Site":"http://www.coffeebar.co.il/",
			"tip":"Well established, causal and classy."
        },
        {
            "name":"Radio Rosco",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "Family",
                "Friends",
                "Business"
            ],
            "sitting":[
                "table"
            ],
            "light":"bright",
            "vol":"loud",
            "parking":"no",
            "Tel":"03-5600334",
            "Address":"Allenby 97",
            "Site":"https://www.facebook.com/pages/%D7%A8%D7%93%D7%99%D7%95-%D7%A8%D7%95%D7%A1%D7%A7%D7%95-%D7%A7%D7%A4%D7%99%D7%98%D7%A8%D7%99%D7%94-%D7%90%D7%99%D7%98%D7%9C%D7%A7%D7%99%D7%AA/159061699052",
			"tip":"Thin pizza, casual dinner."
        },
        {
            "name":"Cheder Ochel",
            "date":[
                "no"
            ],
            "so":[
                "friends"
            ],
            "sitting":[
                "table"
            ],
            "light":"bright",
            "vol":"loud",
            "parking":"paid",
            "Tel":"03-6966188",
            "Address":"Shaul Hamelech 23",
            "Site":"https://www.facebook.com/dininghall",
			"tip":"Kibutz food with a twist. Dining hall seating. Best with friends."
        },
        {
            "name":"Vong",
            "date":[
                "no"
            ],
            "so":[
                "family",
                "friends"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"bright",
            "vol":"loud",
            "parking":"paid",
            "Tel":"03-6337171",
            "Address":"Rothschild 15",
            "Site":"http://www.vong.co.il",
			"tip":"Intimate asian place. The best phu soup in town."
        },
        {
            "name":"Pronto",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends, family, business"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"loud",
            "parking":"paid",
            "Tel":"03-5660915",
            "Address":"Herzel 4",
            "Site":"http://www.pronto.co.il/",
			"tip":"One of the best Italians around. Excellent lamb pappardelle."
        },
        {
            "name":"Yakimono",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"paid",
            "Tel":"03-5175171",
            "Address":"Rothschild 19",
            "Site":"http://www.yakimono.co.il",
			"tip":""
        },
        {
            "name":"Mul-Yam",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "family",
                "business",
                "tourists"
            ],
            "sitting":[
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"paid",
            "Tel":"03-5469920",
            "Address":"Hangar 24, Namal Tel Aviv",
            "Site":"http://www.mulyam.com/",
			"tip":"The eldest of the sea food restaurants, open view to the wooden deck of the Tel Aviv harbour."
        },
        {
            "name":"Sardinia",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "family",
                "friends",
                "tourists"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"bright",
            "vol":"loud",
            "parking":"paid",
            "Tel":"03-6832211",
            "Address":"Kikar Kdumim, Yafo",
            "Site":"https://www.facebook.com/SardiniaItalianTrattoria",
			"tip":"At the top of old Jaffa, not only for tourists."
        },
        {
            "name":"Adora",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends",
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"no",
            "Tel":"03-6050896",
            "Address":"Ben Yehuda 226",
            "Site":"http://www.mouse.co.il/CM.Food_Item_Place,382,213,3926,.aspx",
			"tip":"An Israeli chef kitchen with little pretence."
        },
        {
            "name":"David veYosef",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "friends"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"loud",
            "parking":"valet",
            "Tel":"03-6040036",
            "Address":"Montefiore 21",
            "Site":"http://davidveyossef.co.il/",
			"tip":"Don't miss the bar with the view to the glass kitchen."
        },
		{
            "name":"Bertie",
            "date":[
                "no",
				"yes"
            ],
            "so":[
                "friends"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"no",
            "Tel":"072-2512950",
            "Address":"King George 88",
            "Site":"http://www.bertie.co.il/",
			"tip":""
        },
		{
            "name":"Hanoi",
            "date":[
                "no"
                ],
            "so":[
                "friends"
            ],
            "sitting":[
                "table"
            ],
            "light":"dim",
            "vol":"loud",
            "parking":"no",
            "Tel":"03-5337962",
            "Address":"Lilenblum 18",
            "Site":"https://www.facebook.com/Hanoirest",
			"tip":"Asian food with an Asian setting. Truly good ramen soup."
        },
		{
            "name":"Belini",
            "date":[
                "no"
                ],
            "so":[
                "Friends",
				"family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"bright",
            "vol":"loud",
            "parking":"paid",
            "Tel":"03-5178486",
            "Address":"Yehiel 6",
            "Site":"http://www.bellini.co.il/",
			"tip":"Solid Italian, with a cultured setting."
        },
		{
            "name":"Aria",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "family",
				"friends"
            ],
            "sitting":[
                "table",
                "bar"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"no",
            "Tel":" 03-5296054",
            "Address":"Nehalat Binyamin 66",
            "Site":"http://ariatlv.co.il/",
			"tip":"Young chef restaurant, romantic setting."
        },
		{
            "name":"Bistro Eden",
            "date":[
                "yes",
                ""
            ],
            "so":[
                ""
            ],
            "sitting":[
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"no",
            "Tel":"03-5455900",
            "Address":"Yeshuchon 11",
            "Site":"http://edenboutiquehotel.co.il/bistro/",
			"tip":"The feel of a boutique hotel."
        },
		{
            "name":"Alora",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "family",
				"friends"
            ],
            "sitting":[
                "table",
                "bar"
            ],
            "light":"bright",
            "vol":"quiet",
            "parking":"paid",
            "Tel":"03-5665655",
            "Address":"Rothschild 60",
            "Site":"http://www.allora.co.il/",
			"tip":"Open balcony Italian on Rothschild blvd."
        },
		{
            "name":"Baniolet",
            "date":[
                "yes",
                "no"
            ],
            "so":[
                "family"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"dim",
            "vol":"quiet",
            "parking":"paid",
            "Tel":"03-6022813",
            "Address":"Hasharon 14",
            "Site":"https://www.facebook.com/pages/Bagnolet-KitchenBar-%D7%9E%D7%A1%D7%A2%D7%93%D7%AA-%D7%91%D7%A0%D7%99%D7%95%D7%9C%D7%94/161490363950724?fref=ts",
			"tip":""
        },
		{
            "name":"NG",
            "date":[
                "no"
            ],
            "so":[
                "family",
				"friends"
            ],
            "sitting":[
                "bar",
                "table"
            ],
            "light":"bright",
            "vol":"quiet",
            "parking":"paid",
            "Tel":"03-5167888",
            "Address":"Ehad Ha'am 6",
            "Site":"http://www.ngrestaurant.co.il/",
			"tip":"A great place for meat and friends."
        }
	];


    function getList() {
        return rest;
    }

    return {
        getList:getList

    }

})();
