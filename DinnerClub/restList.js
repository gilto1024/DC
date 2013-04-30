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
            phone:"03-5523456"
		},
		{
			name:"Brasserie",
			date:"no",
			so:["friends", "family", "business"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"yes"
		},
		{
			name:"Mizlala",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"no"
		},
		{
			name:"Cantina",
			date:"no",
			so:["friends", "family", "business"],
			sitting:["table"],
			light:"dim",
			vol:"quiet",
			parking:"yes"
		},
		{
			name:"Catit",
			date:"yes",
			so:[""],
			sitting:["table"],
			light:"bright",
			vol:"quiet",
			parking:"yes"
		},
		{
			name:"Yafo Tel Aviv	",
			date:"yes",
			so:["family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes"
		},
		{
			name:"Messa",
			date:"yes",
			so:["business"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes"
		},
		{
			name:"Joya",
			date:"no",
			so:["friends", "family", "business"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"quiet",
			parking:"yes"
		},
		{
			name:"Herbert Samuel",
			date:"yes",
			so:["family", "tourists", "business"],
			sitting:["table"],
			light:"dim",
			vol:"quiet",
			parking:"yes"
		},
		{
			name:"Rafael",
			date:"no",
			so:["friends", "family", "business", "tourists"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes"
		},
		{
			name:"Onami",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"quiet",
			parking:"yes"
		},
		{
			name:"Tapeo",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes"
		},
		{
			name:"Turkiz",
			date:"no",
			so:["friends", "family", "tourists"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"yes"
		},
		{
			name:"Boya",
			date:"no",
			so:["friends", "family", "tourists"],
			sitting:["table"],
			light:"bright",
			vol:"quiet",
			parking:"yes"
		},
		{
			name:"Dallal",
			date:"no",
			so:["friennds", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes"
		},
		{
			name:"Suzanna",
			date:"no",
			so:["friends", "family", "tourists"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"yes"
		},
		{
			name:"Social Club",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"no"
		},
		{
			name:"Yavne Montifiore",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes"
		},
		{
			name:"Makom Shel Basar",
			date:"no",
			so:["friends", "family"],
			sitting:["table"],
			light:"dim",
			vol:"quiet",
			parking:"no"
		},
		{
			name:"Viki Christina",
			date:"yes",
			so:["friends", "family", "tourists"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes"
		},
		{
			name:"Abraxas North",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"no"
		},
		{
			name:"Zepra",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes"
		},
		{
			name:"Nanuchka",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:	"dim",
			vol:"loud",
			parking:"no"
		},
		{
			name:"Port Said",
			date:"no",
			so:["friends", "family"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"yes"
		},
		{
			name:"Kalamata",
			date:"yes",
			so:["friends", "family", "tourists"],
			sitting:["table"],
			light:"dim",
			vol:"quiet",
			parking:"no"
		},
		{
			name:"Hotel Monefiore",
			date:"yes",
			so:["business"],
			sitting:["table"],
			light:"dim",
			vol:"quiet",
			parking:"no"
		},
		{
			name:"Alba",
			date:"yes",
			so:[""],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes"
		},
		{
			name:"Café Europa",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes"
		},
		{
			name:"Pini Bachatzer",
			date:"no",
			so:["friends", "family", "tourists"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"no"
		},
		{
			name:"Shila",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes"
		},
		{
			name:"Tapas 1 ha'am",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes"
		},
		{
			name:"Sola",
			date:"yes",
			so:[""],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"no"
		},
		{
			name:"Taizu",
			date:"yes",
			so:["family", "friends"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"no"
		},
		{
			name:"Juz & Luz",
			date:"yes",
			so:[""],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"no"
		},
		{
			name:"Toto",
			date:"yes",
			so:["family", "friends"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"loud",
			parking:"yes"
		},
		{
			name:"Mel & Michelle",
			date:"yes",
			so:[""],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"yes"
		},
		{
			name:"Mitbach Laila",
			date:"yes",
			so:["friends"],
			sitting:["bar"],
			light:"dim",
			vol:"loud",
			parking:"no"
		},
		{
			name:"Yassu",
			date:"no",
			so:["friends"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"no"
		},
		{
			name:"Flee Market",
			date:"no",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"no"
		},
		{
			name:"Kitchen Market",
			date:"no",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"paid"
		},
		{
			name:"Alma",
			date:"yes",
			so:[""],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"no"
		},
		{
			name:"HaShulchan",
			date:"no",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"loud",
			parking:"no"
		},
		{
			name:"Popina",
			date:"yes",
			so:["friends", "family"],
			sitting:["bar", "table"],
			light:"dim",
			vol:"quiet",
			parking:"valet"
		},
		{
			name:"Cocina Tamar",
			date:"yes",
			so:["friends", "family"],
			sitting:["table"],
			light:"bright",
			vol:"quiet",
			parking:"yes"
		},
		{
			name:"Delicatessen",
			date:"no",
			so:["friends", "family"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"paid"
		},
		{
			name:"Coffee Bar",
			date:"yes",
			so:["family", "Friends", "Business"],
			sitting:["bar", "table"],
			light:"bright",
			vol:"quiet",
			parking:"no"
		},
		{
			name:"Radio Rosco",
			date:"yes",
			so:["Family", "Friends", "Business"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"no"
		},
		{
			name:"Cheder Ochel",
			date:"no",
			so:	["friends"],
			sitting:["table"],
			light:"bright",
			vol:"loud",
			parking:"paid"
		}
    ];


    function getList(){
        return rest;
    }

    return {
        getList:getList

    }

})();
