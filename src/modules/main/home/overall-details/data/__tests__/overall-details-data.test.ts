import { OverallDetailsData } from '../overall-details-data';
import { DetailsType } from '../../types/details-type';

describe('OverallDetailsData', () => {
    test('is an array', () => {
        expect(Array.isArray(OverallDetailsData)).toBe(true);
    });

    test('has correct number of items', () => {
        expect(OverallDetailsData).toHaveLength(4);
    });

    test('all items have required properties', () => {
        OverallDetailsData.forEach((item: DetailsType) => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('value');
            expect(item).toHaveProperty('color');
            expect(item).toHaveProperty('darkModeColor');
            expect(item).toHaveProperty('percentageChange');
            expect(item).toHaveProperty('textColor');
            expect(item).toHaveProperty('darkModeTextColor');
            expect(item).toHaveProperty('changeType');
        });
    });

    test('all properties have correct types', () => {
        OverallDetailsData.forEach((item: DetailsType) => {
            expect(typeof item.id).toBe('string');
            expect(typeof item.title).toBe('string');
            expect(typeof item.value).toBe('string');
            expect(typeof item.color).toBe('string');
            expect(typeof item.darkModeColor).toBe('string');
            expect(typeof item.percentageChange).toBe('number');
            expect(typeof item.textColor).toBe('string');
            expect(typeof item.darkModeTextColor).toBe('string');
            expect(typeof item.changeType).toBe('string');
        });
    });

    test('contains customers data', () => {
        const customersItem = OverallDetailsData.find(item => item.title === 'Customers');
        expect(customersItem).toBeDefined();
        expect(customersItem?.id).toBe('1');
        expect(customersItem?.value).toBe('3,781');
        expect(customersItem?.changeType).toBe('positive');
        expect(customersItem?.percentageChange).toBe(11.01);
    });

    test('contains orders data', () => {
        const ordersItem = OverallDetailsData.find(item => item.title === 'Orders');
        expect(ordersItem).toBeDefined();
        expect(ordersItem?.id).toBe('2');
        expect(ordersItem?.value).toBe('1,219');
        expect(ordersItem?.changeType).toBe('negative');
        expect(ordersItem?.percentageChange).toBe(0.03);
    });

    test('contains revenue data', () => {
        const revenueItem = OverallDetailsData.find(item => item.title === 'Revenue');
        expect(revenueItem).toBeDefined();
        expect(revenueItem?.id).toBe('3');
        expect(revenueItem?.value).toBe('$695');
        expect(revenueItem?.changeType).toBe('positive');
        expect(revenueItem?.percentageChange).toBe(15.03);
    });

    test('contains growth data', () => {
        const growthItem = OverallDetailsData.find(item => item.title === 'Growth');
        expect(growthItem).toBeDefined();
        expect(growthItem?.id).toBe('4');
        expect(growthItem?.value).toBe('30.1%');
        expect(growthItem?.changeType).toBe('positive');
        expect(growthItem?.percentageChange).toBe(6.08);
    });

    test('all ids are unique', () => {
        const ids = OverallDetailsData.map(item => item.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });

    test('all titles are unique', () => {
        const titles = OverallDetailsData.map(item => item.title);
        const uniqueTitles = new Set(titles);
        expect(uniqueTitles.size).toBe(titles.length);
    });

    test('changeType values are valid', () => {
        const validChangeTypes = ['positive', 'negative'];
        OverallDetailsData.forEach((item: DetailsType) => {
            expect(validChangeTypes).toContain(item.changeType);
        });
    });

    test('percentage changes are numbers', () => {
        OverallDetailsData.forEach((item: DetailsType) => {
            expect(typeof item.percentageChange).toBe('number');
            expect(item.percentageChange).toBeGreaterThanOrEqual(0);
        });
    });

    test('color properties contain valid CSS classes', () => {
        OverallDetailsData.forEach((item: DetailsType) => {
            expect(item.color).toMatch(/^bg-/);
            expect(item.darkModeColor).toMatch(/^bg-/);
            expect(item.textColor).toMatch(/^text-/);
            expect(item.darkModeTextColor).toMatch(/^text-/);
        });
    });

    test('values are non-empty strings', () => {
        OverallDetailsData.forEach((item: DetailsType) => {
            expect(item.title.length).toBeGreaterThan(0);
            expect(item.value.length).toBeGreaterThan(0);
        });
    });

    test('has both positive and negative change types', () => {
        const changeTypes = OverallDetailsData.map(item => item.changeType);
        expect(changeTypes).toContain('positive');
        expect(changeTypes).toContain('negative');
    });
});
