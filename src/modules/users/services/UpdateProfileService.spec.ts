import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John F. Doe',
      email: 'johnfdoe@mail.com',
    });

    expect(updatedUser.name).toBe('John F. Doe');
    expect(updatedUser.email).toBe('johnfdoe@mail.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Erick Doe',
      email: 'johnerickdoe@mail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John E. Doe',
        email: 'johndoe@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to updated the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John F. Doe',
      email: 'johnfdoe@mail.com',
      old_password: '123456',
      password: '121212',
    });

    expect(updatedUser.password).toBe('121212');
  });

  it('should not be able to updated the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John F. Doe',
        email: 'johnfdoe@mail.com',
        password: '121212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to updated the password with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John F. Doe',
        email: 'johnfdoe@mail.com',
        old_password: 'wrong-old-password',
        password: '121212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'non existing user name',
        email: 'nonexistinguseremail@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
