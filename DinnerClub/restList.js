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
			tel: "03-5612888"
		},
		{
			name:"Brasserie",
			date:"no",
			so:["friends", "family", "business"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"yes",
			tel: "03-6967111"
		},
		{
			name:"Mizlala",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"no",
			tel: "03-5665505"
		},
		{
			name:"Cantina",
			date:"no",
			so:["friends", "family", "business"],
			sitting:["table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			tel: "03-6205051"
		},
		{
			name:"Catit",
			date:"yes",
			so:[""],
			sitting:["table"],
			light:"bright",
			vol:"quiet",
			parking:"yes",
			tel: "03-5107001"
		},
		{
			name:"Yafo Tel Aviv	",
			date:"yes",
			so:["family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			tel: "03-6249249"
		},
		{
			name:"Messa",
			date:"yes",
			so:["business"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			tel: "03-6856859"
		},
		{
			name:"Joya",
			date:"no",
			so:["friends", "family", "business"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"quiet",
			parking:"yes",
			tel: "03-6425854"
		},
		{
			name:"Herbert Samuel",
			date:"yes",
			so:["family", "tourists", "business"],
			sitting:["table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			tel: "03-5166516"
		},
		{
			name:"Rafael",
			date:"no",
			so:["friends", "family", "business", "tourists"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5226464"
		},
		{
			name:"Onami",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5621172"
		},
		{
			name:"Tapeo",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes",
			Tel: "03-6240484"
		},
		{
			name:"Turkiz",
			date:"no",
			so:["friends", "family", "tourists"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"yes",
			Tel: "03-6996306"
		},
		{
			name:"Boya",
			date:"no",
			so:["friends", "family", "tourists"],
			sitting:["table"],
			light:"bright",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5446166"
		},
		{
			name:"Dallal",
			date:"no",
			so:["friennds", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5109292"
		},
		{
			name:"Suzanna",
			date:"no",
			so:["friends", "family", "tourists"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"yes",
			Tel: "03-5177580"
		},
		{
			name:"Social Club",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"no",
			Tel: "03-5601114"
		},
		{
			name:"Yavne Montifiore",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5666189"
		},
		{
			name:"Makom Shel Basar",
			date:"no",
			so:["friends", "family"],
			sitting:["table"],
			light:"dim",
			vol:"quiet",
			parking:"no",
			Tel: "03-5104020"
		},
		{
			name:"Viki Christina",
			date:"yes",
			so:["friends", "family", "tourists"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes",
			Tel: "03-7367272"
		},
		{
			name:"Abraxas North",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"no",
			Tel: "03-5166660"
		},
		{
			name:"Zepra",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-6240044"
		},
		{
			name:"Nanuchka",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:	"dim",
			vol:"loud",
			parking:"no",
			Tel: "03-5162254"
		},
		{
			name:"Port Said",
			date:"no",
			so:["friends", "family"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"yes",
			Tel: "03-6207436 - No reservation"
		},
		{
			name:"Kalamata",
			date:"yes",
			so:["friends", "family", "tourists"],
			sitting:["table"],
			light:"dim",
			vol:"quiet",
			parking:"no",
			Tel: "03-6819998"
		},
		{
			name:"Hotel Monefiore",
			date:"yes",
			so:["business"],
			sitting:["table"],
			light:"dim",
			vol:"quiet",
			parking:"no",
			Tel: "03-5646100"
		},
		{
			name:"Alba",
			date:"yes",
			so:[""],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5467905"
		},
		{
			name:"Café Europa",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes",
			Tel: "03-5259987"
		},
		{
			name:"Pini Bachatzer",
			date:"no",
			so:["friends", "family", "tourists"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"no",
			Tel: "03-6822111"
		},
		{
			name:"Shila",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes",
			Tel:"03-5221224"
		},
		{
			name:"Tapas 1 ha'am",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes",
			Tel: "03-5666966"
		},
		{
			name:"Sola",
			date:"yes",
			so:[""],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"no",
			Tel: "03-5499626"
		},
		{
			name:"Taizu",
			date:"yes",
			so:["family", "friends"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"no",
			Tel: "03-5225005"
		},
		{
			name:"Juz & Luz",
			date:"yes",
			so:[""],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"no",
			Tel: "03-5606385"
		},
		{
			name:"Toto",
			date:"yes",
			so:["family", "friends"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes",
			Tel: "03-6935151"
		},
		{
			name:"Mel & Michelle",
			date:"yes",
			so:[""],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes",
			Tel: "03-5293232"
		},
		{
			name:"Mitbach Laila",
			date:"yes",
			so:["friends"],
			sitting:["bar"],
			light:"dim",
			vol:"loud",
			parking:"no",
			Tel: "03-5660481"
		},
		{
			name:"Yassu",
			date:"no",
			so:["friends"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"no",
			Tel: "03-6031719"
		},
		{
			name:"Flee Market",
			date:"no",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"no",
			Tel: "03-6202262"
		},
		{
			name:"Kitchen Market",
			date:"no",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"paid",
			Tel: "03-5446669"
		},
		{
			name:"Alma",
			date:"yes",
			so:[""],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"no",
			Tel: "03-6308777"
		},
		{
			name:"HaShulchan",
			date:"no",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"no",
			Tel: "03-5257171"
		},
		{
			name:"Popina",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"valet",
			Tel: "03-5757477"
		},
		{
			name:"Cocina Tamar",
			date:"yes",
			so:["friends", "family"],
			sitting:["table"],
			light:"bright",
			vol:"quiet",
			parking:"yes",
			Tel: "03-6390407"
		},
		{
			name:"Delicatessen",
			date:"no",
			so:["friends", "family"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"paid",
			Tel: "03-9681010"
		},
		{
			name:"Coffee Bar",
			date:"yes",
			so:["family", "Friends", "Business"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"quiet",
			parking:"no",
			Tel: "03-6889696"
		},
		{
			name:"Radio Rosco",
			date:"yes",
			so:["Family", "Friends", "Business"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"no",
			Tel: "03-5600334"
		},
		{
			name:"Cheder Ochel",
			date:"no",
			so:	["friends"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"paid",
			Tel: "03-6966188"
		},
		{
			name:"Bread Story",
			date:"no",
			so:	["friends"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"no",
			Tel: "03-5283888"
		}
    ];


    function getList(){
        return rest;
    }

    return {
        getList:getList

    }

})();
