import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 14, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 14, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 14, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 14, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 14, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 14, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 14, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 14, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 14, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 14, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 15, 17, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user-id',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 13, available: true },
        { day: 14, available: false },
        { day: 15, available: true },
        { day: 16, available: true },
      ]),
    );
  });
});
