import { UserData } from '../user-data';

describe('UserData', () => {
    test('has correct structure', () => {
        expect(UserData).toHaveProperty('name');
        expect(UserData).toHaveProperty('avatar');
    });

    test('has correct name value', () => {
        expect(UserData.name).toBe('ByeWind');
    });

    test('has correct avatar path', () => {
        expect(UserData.avatar).toBe('/images/ByeWind.png');
    });

    test('name is a string', () => {
        expect(typeof UserData.name).toBe('string');
    });

    test('avatar is a string', () => {
        expect(typeof UserData.avatar).toBe('string');
    });

    test('name is not empty', () => {
        expect(UserData.name.length).toBeGreaterThan(0);
    });

    test('avatar path is not empty', () => {
        expect(UserData.avatar?.length).toBeGreaterThan(0);
    });
});
