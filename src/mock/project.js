import Mock from "mockjs";

Mock.mock("/api/project","get",{
    code: 0,
	msg: "",
	"data|5-20": [
    {
      id: "@guid",
      name: "@cname",
      url: "@url",
      github: "@url",
      description: ["@cparagraph(2,3)", "@cparagraph(2,3)"],
      "thumb|1": ["@image('300x250','@color','#fff','@natural')",null],
      "order|+1": 1
    },
  ]
})