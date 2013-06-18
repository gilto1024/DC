var restList = (function () {
    var rest = [
        {
			name:"Café Italia",
			date:"no",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"yes",
			Tel: "03-5612888",
			Address: "Kremintzki 6"
		},
		{
			name:"Brasserie",
			date:"no",
			so:["friends", "family", "business"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"yes",
			Tel: "03-6967111",
			Address: "Ibn Gabirol 70"
		},
		{
			name:"Mizlala",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"no",
			Tel: "03-5665505",
			Address: "Nahalat Binyamin 57"
		},
		{
			name:"Cantina",
			date:"no",
			so:["friends", "family", "business"],
			sitting:["table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-6205051",
			Address: "Rothschild 71"
		},
		{
			name:"Catit",
			date:"yes",
			so:[""],
			sitting:["table"],
			light:"bright",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5107001",
			Address: "Heichal HaTalmud 4"
		},
		{
			name:"Yafo Tel Aviv	",
			date:"yes",
			so:["family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-6249249",
			Address: "Yigal Alon 98"
		},
		{
			name:"Messa",
			date:"yes",
			so:["business"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-6856859",
			Address: "HaArba'a 19"
		},
		{
			name:"Joya",
			date:"no",
			so:["friends", "family", "business"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"quiet",
			parking:"yes",
			Tel: "03-6425854",
			Address: "HaArba'a 5"
		},
		{
			name:"Herbert Samuel",
			date:"yes",
			so:["family", "tourists", "business"],
			sitting:["table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5166516",
			Address: "Kaufmann 6"
		},
		{
			name:"Rafael",
			date:"no",
			so:["friends", "family", "business", "tourists"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5226464",
			Address: "Yarkon 87"
		},
		{
			name:"Onami",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5621172",
			Address: "HaArba'a 18"
		},
		{
			name:"Tapeo",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes",
			Tel: "03-6240484",
			Address: "HaArba'a 16"
		},
		{
			name:"Turkiz",
			date:"no",
			so:["friends", "family", "tourists"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"yes",
			Tel: "03-6996306",
			Address: "Rosenblum 6"
		},
		{
			name:"Boya",
			date:"no",
			so:["friends", "family", "tourists"],
			sitting:["table"],
			light:"bright",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5446166",
			Address: "HaTa'arucha 3"
		},
		{
			name:"Dallal",
			date:"no",
			so:["friennds", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5109292",
			Address: "Shabazi 10"
		},
		{
			name:"Suzanna",
			date:"no",
			so:["friends", "family", "tourists"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"yes",
			Tel: "03-5177580",
			Address: "Shabazi 9"
		},
		{
			name:"Social Club",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"no",
			Tel: "03-5601114",
			Address: "Rothschild 45"
		},
		{
			name:"Yavne Montifiore",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5666189",
			Address: "Montefiore 31"
		},
		{
			name:"Makom Shel Basar",
			date:"no",
			so:["friends", "family"],
			sitting:["table"],
			light:"dim",
			vol:"quiet",
			parking:"no",
			Tel: "03-5104020",
			Address: "Shabazi 64"
		},
		{
			name:"Viki Christina",
			date:"yes",
			so:["friends", "family", "tourists"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes",
			Tel: "03-7367272",
			Address: "Kaufmann 2"
		},
		{
			name:"Abraxas North",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"no",
			Tel: "03-5166660",
			Address: "Lilienblum 40"
		},
		{
			name:"Zepra",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-6240044",
			Address: "Yigal Alon 96"
		},
		{
			name:"Nanuchka",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:	"dim",
			vol:"loud",
			parking:"no",
			Tel: "03-5162254",
			Address: "Lilienblum 30"
		},
		{
			name:"Port Said",
			date:"no",
			so:["friends", "family"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"yes",
			Tel: "03-6207436",
			Address: "Ha Sinai 2"
		},
		{
			name:"Kalamata",
			date:"yes",
			so:["friends", "family", "tourists"],
			sitting:["table"],
			light:"dim",
			vol:"quiet",
			parking:"no",
			Tel: "03-6819998",
			Address: "Kikar Kdumim 10"
		},
		{
			name:"Hotel Monefiore",
			date:"yes",
			so:["business"],
			sitting:["table"],
			light:"dim",
			vol:"quiet",
			parking:"no",
			Tel: "03-5646100",
			Address: "Montefiore 36"
		},
		{
			name:"Alba",
			date:"yes",
			so:[""],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5467905",
			Address: "Ibn Gabirol 36"
		},
		{
			name:"Café Europa",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes",
			Tel: "03-5259987",
			Address: "Rothschild 9"
		},
		{
			name:"Hatzer Goldman",
			date:"no",
			so:["friends", "family", "tourists"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"no",
			Tel: "03-6822111",
			Address: "Goldman 6"
		},
		{
			name:"Shila",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes",
			Tel:"03-5221224",
			Address: "Ben Yehuda 182"
		},
		{
			name:"Tapas 1 ha'am",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes",
			Tel: "03-5666966",
			Address: "Ehad Ha'am 27"
		},
		{
			name:"Sola",
			date:"yes",
			so:[""],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"no",
			Tel: "03-5499626",
			Address: "Beit Eshel 31"
		},
		{
			name:"Taizu",
			date:"yes",
			so:["family", "friends"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"no",
			Tel: "03-5225005",
			Address: "Begin 23"
		},
		{
			name:"Juz & Luz",
			date:"yes",
			so:[""],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"no",
			Tel: "03-5606385",
			Address: "Yehuda Halevi 51"
		},
		{
			name:"Toto",
			date:"yes",
			so:["family", "friends"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes",
			Tel: "03-6935151",
			Address: "Berkovich 4"
		},
		{
			name:"Mel & Michelle",
			date:"yes",
			so:[""],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5293232",
			Address: "Ben Yehuda 155"
		},
		{
			name:"Mitbach Laila",
			date:"yes",
			so:["friends"],
			sitting:["bar"],
			light:"dim",
			vol:"loud",
			parking:"no",
			Tel: "03-5660481",
			Address: "Lilienblum 43"
		},
		{
			name:"Yassu",
			date:"no",
			so:["friends"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"no",
			Tel: "03-6031719",
			Address: "Yarkon 105"
		},
		{
			name:"Flee Market",
			date:"no",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"no",
			Tel: "03-6202262",
			Address: "Rabbi Yohanan 8"
		},
		{
			name:"Kitchen Market",
			date:"no",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"paid",
			Tel: "03-5446669",
			Address: "Hangar 12, Nemal Tel Aviv"
		},
		{
			name:"Alma",
			date:"yes",
			so:[""],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"no",
			Tel: "03-6308777",
			Address: "Yavne 23"
		},
		{
			name:"HaShulchan",
			date:"no",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"no",
			Tel: "03-5257171",
			Address: "Rothschild 73"
		},
		{
			name:"Popina",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"valet",
			Tel: "03-5757477",
			Address: "Ehad Ha'am 3"
		},
		{
			name:"Cocina Tamar",
			date:"yes",
			so:["friends", "family"],
			sitting:["table"],
			light:"bright",
			vol:"quiet",
			parking:"yes",
			Tel: "03-6390407",
			Address: "HaTsfira 10"
		},
		{
			name:"Delicatessen",
			date:"no",
			so:["friends", "family"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"paid",
			Tel: "03-9681010",
			Address: "Yehuda Halevi 78/81"
		},
		{
			name:"Coffee Bar",
			date:"yes",
			so:["family", "Friends", "Business"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"quiet",
			parking:"no",
			Tel: "03-6889696",
			Address: "Yad Haruzim 13"
		},
		{
			name:"Radio Rosco",
			date:"yes",
			so:["Family", "Friends", "Business"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"no",
			Tel: "03-5600334",
			Address: "Allenby 97"
		},
		{
			name:"Cheder Ochel",
			date:"no",
			so:	["friends"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"paid",
			Tel: "03-6966188",
			Address: "Shaul Hamelech 23"
		},
		{
			name:"Bread Story",
			date:"no",
			so:	["friends"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"no",
			Tel: "03-5283888",
			Address: "Dizingoff 88"
		}
    ];


    function getList(){
        return rest;
    }

    return {
        getList:getList

    }

})();
