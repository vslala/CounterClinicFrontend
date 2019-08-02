This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### API Info
Api for slot generation
*Method*: POST

```
body: {
    doctorId: 123,
    daysOfWeek: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
    startTime: "09:00:00",
    endTime: "17:00:00",
    duration: "30", // in minutes
}
```

Api to fetch doctor free slots

*Method*: GET
