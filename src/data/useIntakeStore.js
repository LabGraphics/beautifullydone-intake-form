import { create } from 'zustand';

const useIntakeStore = create((set) => ({
  eventName: '', eventType: '', eventDate: '', guestCount: '',
  locationType: '', indoorsOutdoors: '', locationName: '', fullAddress: '', startTime: '', endTime: '',
  servicesNeeded: [],
  needsRentals: '', rentalsList: [],
  additionalVendors: [], vendorPreferences: '',
  budget: '', openToRecommendations: '',
  contactName: '', contactEmail: '', phoneNumber: '', preferredContact: '',
  finalNotes: '',

  updateField: (key, value) => set((state) => ({ ...state, [key]: value })),
  resetForm: () => set({
    eventName: '', eventType: '', eventDate: '', guestCount: '',
    locationType: '', indoorsOutdoors: '', locationName: '', fullAddress: '', startTime: '', endTime: '',
    servicesNeeded: [], needsRentals: '', rentalsList: [],
    additionalVendors: [], vendorPreferences: '',
    budget: '', openToRecommendations: '',
    contactName: '', contactEmail: '', phoneNumber: '', preferredContact: '',
    finalNotes: ''
  })
}));

export default useIntakeStore;
