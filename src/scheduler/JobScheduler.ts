import { Job, scheduleJob } from 'node-schedule';

// this id represents the id of the schedule of a garden. It will be used to identify jobs in
// the JobScheduler to have access to the node-schedule API and cancel them, for example
type JobSchedule = {
  id: number;
  dayNumber: number;
  job: Job;
};

export class JobScheduler {
  static jobs: Array<JobSchedule> = [];

  static createAJob(id: number, dayNumber: number, callback: () => void) {
    const wateringJob = scheduleJob(
      `watering - scheduleId:${id}`,
      `0 13 * * ${dayNumber}`, // every dayNumber at minute 0 and second 0

      // `* * * ? * *`, // every second
      // `0 * * ? * *`, // every minute
      callback
    );

    JobScheduler.jobs.push({ id, dayNumber, job: wateringJob });
  }

  static cancelAJob(jobId: number) {
    JobScheduler.jobs.map(({ id, job }) => {
      if (id === jobId) {
        job.cancel();
      }
    });

    JobScheduler.jobs = JobScheduler.jobs.filter(({ id }) => id !== jobId);
  }

  static toString() {
    return JobScheduler.jobs.map(({ id, job, dayNumber }) => ({
      id,
      dayNumber,
      job: {
        name: job.name,
      },
    }));
  }
}
