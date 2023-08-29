GymPass style app.

## RFs (functional requirements)

- [ ] It must be possible to register;
- [ ] It must be possible to authenticate;
- [ ] It must be possible to obtain the profile of a logged in user;
- [ ] It must be possible to obtain the number of check-ins performed by the logged-in user;
- [ ] It must be possible for the user to obtain his check-in history;
- [ ] It should be possible for the user to search for nearby gyms;
- [ ] It should be possible for the user to search for gyms by name;
- [ ] It must be possible for the user to check-in at the gym;
- [ ] It must be possible to validate a user's check-in;
- [ ] It must be possible to register a gym;

## RNs (business rules)

- [ ] The user cannot register with a duplicate email;
- [ ] The user cannot perform 2 check-ins on the same day;
- [ ] The user will not be able to check-in if he is not close (100m) to the gym;
- [ ] The check-in can only be validated up to 20 minutes after being created;
- [ ] Check-in can only be validated by administrators;
- [ ] The academy can only be registered by administrators;

## NFRs (non-functional requirements)

- [ ] The user's password must be encrypted;
- [ ] The application data must be persisted in a PostgreSQL database;
- [ ] All data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token);
