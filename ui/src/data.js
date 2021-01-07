export const forms = [
  {
    id: 1,
    name: "Portfolio",
    submissions_count: 10,
    notifications: false,
    target_email: "danielchi@gmail.com",
    subs: [
      {
        id: 1,
        name: "dan joe",
        email: "d@d.com",
        subject: "Hiring Possibilities",
        message: "Hello dANIEL I want to hire you for a breif job"
      },
      {
        id: 2,
        name: "jane del",
        email: "janey@d.com",
        subject: "A freelance Gig",
        message:
          "I have a gig for you spanning 3 months are you intrested, pay is 200k/month, if you are intrested reach out to me. and please do kknow it is a time sensitive matter"
      },
      {
        id: 3,
        name: "jane del",
        email: "janey@d.com",
        subject: "A freelance Gig",
        message:
          "I have a gig for you spanning 3 months are you intrested, pay is 200k/month, if you are intrested reach out to me. and please do kknow it is a time sensitive matter"
      },
      {
        id: 4,
        name: "jane del",
        email: "janey@d.com",
        subject: "A freelance Gig",
        message:
          "I have a gig for you spanning 3 months are you intrested, pay is 200k/month, if you are intrested reach out to me. and please do kknow it is a time sensitive matter"
      },
      {
        id: 5,
        name: "jane del",
        email: "janey@d.com",
        subject: "A freelance Gig",
        message:
          "I have a gig for you spanning 3 months are you intrested, pay is 200k/month, if you are intrested reach out to me. and please do kknow it is a time sensitive matter"
      },
      {
        id: 6,
        name: "jane del",
        email: "janey@d.com",
        subject: "A freelance Gig",
        message:
          "I have a gig for you spanning 3 months are you intrested, pay is 200k/month, if you are intrested reach out to me. and please do kknow it is a time sensitive matter"
      }
    ]
  },
  {
    id: 2,
    name: "chi.io",
    submissions_count: 1000,
    notifications: true,
    target_email: "igwe@gmail.com",
    subs: [
      {
        id: 1,
        name: "xyman nuel",
        email: "danielchi@gmail.com",
        subject: "Request Prescence",
        message:
          "Hello I would like to meet and discuss the ideas you have. contacct me soonest"
      }
    ]
  }
];

export const plans = [
  {
    id: 1,
    name: "free",
    price: 0,
    isCurrent: true,
    maxForms: 2,
    maxSubmission: 10,
    features: []
  },
  {
    id: 2,
    name: "basic",
    price: 20,
    isCurrent: false,
    maxForms: 50,
    maxSubmission: 9999,
    features: ["export"]
  },
  {
    id: 3,
    name: "team",
    price: 50,
    isCurrent: false,
    maxForms: 9999,
    maxSubmission: 9999,
    features: ["export", "autoResponse"]
  }
];
